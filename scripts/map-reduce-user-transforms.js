'use strict';
// use #test
const client = new Mongo();
var db = client.getDB('test');
//
const FUNCTIONS = [];
// cleanup
const cleanup = () => {
    FUNCTIONS.forEach((doc) =>  {
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
    if(!nat) return null;
    switch(nat.toLowerCase()) {
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
var mapper = function() {
    var key = this._id;
    var value = {
        "gender": this.gender,
        "name": {
            "title": this.name.title,
            "first": this.name.first,
            "last": this.name.last,
            "fullName": `${this.name.first} ${this.name.last}`
        },
        "location": {
            "street": this.location.street,
            "city": this.location.city,
            "state": this.location.state,
            "postcode": this.location.postcode
        },
        "email": this.email,
        "dob": convertToISODate(this.dob),
        "quarter": computeQuarterForISODate(convertToISODate(this.dob)),
        "registered": convertToISODate(this.registered),
        "phone": this.phone,
        "cell": this.cell,
        "id": {
            "name": this.id.name,
            "value": this.id.value
        },
        "picture": {
            "large": this.picture.large,
            "medium": this.picture.medium,
            "thumbnail": this.picture.thumbnail
        },
        "nat": this.nat,
        "category": computeCategory(this.nat)
    };
    emit(key, value);
};
const reducer = (key, values) => {
    // this won't be called
    return values[0];
};
// reduce
var results = db.users.mapReduce(
    mapper,
    reducer,
    {
        out: 'users_mapped'
    }
);
if(results.ok !== 1) {
    print('failed to map users');
    cleanup();
    quit();
}
//
results = db.users_mapped.aggregate([
    {
        $project: {
            _id: 1,
            gender: '$value.gender',
            first: '$value.name.first',
            last: '$value.name.last',
            fullName: '$value.name.fullName',
            "email": '$value.email',
            "dob": '$value.dob',
            "year": {
                $year: '$value.dob'
            },
            "quarter": '$value.quarter',
            "month": {
                $month: '$value.dob'
            },
            "week": {
                $week: '$value.dob'
            },
            "registered": '$value.registered',
            "phone": '$value.phone',
            "cell": '$value.cell',
            "picture": {
                "large": '$value.picture.large',
                "medium": '$value.picture.medium',
                "thumbnail": '$value.picture.thumbnail'
            },
            "nat": '$value.nat',
            "category": '$value.category'
        }
    },
    {
        $out: 'users_mapped'
    }
]);
printjson(results);
// quit
cleanup();
quit();
