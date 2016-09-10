'use strict';
// use #test
var client = new Mongo();
var db = client.getDB('test');
// util(s)
var toUpperCase = function(txt) {
    if(!txt) return txt;
    return txt.toUpperCase();
};
db.system.js.save({
    _id: 'toUpperCase',
    value: toUpperCase
});
// mapper
var mapper = function() {
    var key = this._id;
    var value = {
        "gender": this.gender,
        "name": {
            "title" : toUpperCase(this.name.title),
		    "first" : toUpperCase(this.name.first),
		    "last" : toUpperCase(this.name.last)
        },
        "location": {
            "street" : this.location.street,
            "city" : this.location.city,
            "state" : this.location.state,
            "postcode" : this.location.postcode
        },
        "email": this.email,
        "dob": ISODate(this.dob),
        "registered": ISODate(this.dob),
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
        "nat": this.nat
    };
    emit(key, value);
};
var reducer = function(key, values) {
    return key;
};
var finalizer = function(key, reducedValues) {
    return reducedValues;
}
// cleanup
db.user_transformed.drop();
// reduce
db.users.mapReduce(
    mapper,
    reducer,
    {
        out: "reduced_users",
        finalize: finalizer
    }
);
// remove helpers
db.system.js.remove({
    _id: 'toUpperCase'
});
// Quit
quit();
