'use strict';
// users will be redeclared by load operation
var users
//
var loaded = load('../seeds/users.js');
if(loaded == false) {
    print('failed to load seed data');
    quit();
}
// connection
var client = new Mongo();
var db = client.getDB('test');
// drop users
print('removing data');
var deleted = db.users.drop();
// bulk insert users
print('bulk insert data');
var results = db.users.insert(users);
printjson(results);
// quit
quit();
