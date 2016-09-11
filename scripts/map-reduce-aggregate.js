'use strict';
// use #test
const client = new Mongo();
var db = client.getDB('test');
//
const FUNCTIONS = [];
// cleanup
const cleanup = () => {
    FUNCTIONS.forEach((doc) => {
        db.system.js.remove(doc);
    });
};
// compute quater
var computeQuarterForISODate = (date) => {
    var month = date.getMonth() + 1;
    if (month > 9) return 4;
    if (month > 6) return 3;
    if (month > 3) return 2;
    return 1;
};
FUNCTIONS.push({
    _id: 'computeQuarterForISODate',
    value: computeQuarterForISODate
});
// compute country (nat) category
var computeCategory = (nat) => {
    if (!nat) return null;
    switch (nat.toLowerCase()) {
        case 'dk':
        case 'fi':
        case 'nl':
        case 'pl':
            return 'EU';
        case 'BR':
            return 'Other';
        default: {
            return "Other";
        }
    }
};
FUNCTIONS.push({
    _id: 'computeCategory',
    value: computeCategory
});
var convertToISODate = (str) => {
    return ISODate(str.replace(' ', 'T'));
};
FUNCTIONS.push({
    _id: 'convertToISODate',
    value: convertToISODate
})
//
FUNCTIONS.forEach((doc) => {
    db.system.js.save(doc);
});
// mapper
var mapper = function () {
    var key = this._id;
    // mapper and value tranformer
    var value = {
        "gender": this.gender,
        "name": this.name,
        "location": this.location,
        "login": this.login,
        "email": this.email,
        // transform str to ISODate
        "dob": convertToISODate(this.dob),
        // transform str to quarter
        "quarter": computeQuarterForISODate(convertToISODate(this.dob)),
        // transform str to ISODate
        "registered": convertToISODate(this.registered),
        "phone": this.phone,
        "cell": this.cell,
        "id": this.id,
        "picture": this.picture,
        "nat": this.nat,
        // add category based on *nat*ionality
        "category": computeCategory(this.nat)
    };
    emit(key, value);
};
const reducer = (key, values) => {
    // this won't be called
    return values[0];
};
// reduce
var results = db.users_step02.mapReduce(
    mapper,
    reducer,
    {
        out: 'users_step03'
    }
);
if (results.ok !== 1) {
    print('failed to map users');
    cleanup();
    quit();
}
//
results = db.users_step03.aggregate([
    {
        $project: {
            // be explicit
            _id: 1,
            gender: '$value.gender',
            name: {
                first: '$value.name.first',
                last: '$value.name.last',
                title: '$value.name.title',
                fullName: {
                    $concat: [
                        '$value.name.first',
                        ' ',
                        '$value.name.last'
                    ]
                }
            },
            location: '$value.location',
            login: '$value.login',
            "email": '$value.email',
            "dob": '$value.dob',
            // add new information
            "year": {
                $year: '$value.dob'
            },
            "quarter": '$value.quarter',
            // add new information
            "month": {
                $month: '$value.dob'
            },
            // add new information
            "week": {
                $week: '$value.dob'
            },
            "registered": '$value.registered',
            "phone": '$value.phone',
            "cell": '$value.cell',
            "picture": '$value.picture',
            "nat": '$value.nat',
            "category": '$value.category'
        }
    },
    {
        $out: 'users_step03'
    }
]);
printjson(results);
// quit
cleanup();
quit();
