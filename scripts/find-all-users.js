'use strict';
// use #test
var client = new Mongo();
var db = client.getDB('test');
// cursor on collection
var results = db.users.find();
results.forEach(function(user) {
    printjson(user);
});
//
quit();
