/**
 * @example mongo count-users-mr.js
 */
'use strict';
// client
var client = new Mongo();
var db = client.getDB('test');
/**
 * A mapper function
 */
var mapper = function() {
    emit('users', 1);
};
// just sum up all values
/**
 * Sums up all values
 * @param {any} key
 * @param {any} values
 * @returns sump of all values
 */
var reducer = function(key, values) {
    return Array.sum(values);
};
//
var results = db.users.mapReduce(
    mapper,
    reducer,
    {
        out: {
            inline: 1
        }
    }
);
// see output
printjson(results);
// close
quit();
