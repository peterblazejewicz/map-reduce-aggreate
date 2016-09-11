/**
 * Normalize data imported directly from
 * randomusers.me into 'users' collection with
 * mongoimport command
 * After this script is run a new collection 'users_normalized'
 * is created with set of documents
 */
'use strict';
//
const conn = new Mongo();
var db = conn.getDB('test');
//
db.users_step02.drop();
db.users_step01.aggregate([
    {
        $unwind: {
            path: '$results',
            includeArrayIndex: 'id'
        }
    },
    {
        $sort: {
            id: -1
        }
    },
    {
        $project: {
            _id: '$id',
            gender: '$results.gender',
            name: {
                first: '$results.name.first',
                last: '$results.name.last',
                title: '$results.name.title',
                fullName: {
                    $concat: [
                        '$results.name.first',
                        ' ',
                        '$results.name.last'
                    ]
                }
            },
            "location": {
                "street": '$results.location.street',
                "city": '$results.location.city',
                "state": '$results.location.state',
                "postcode": '$results.location.postcode',
            },
            "login": {
                "username": "$results.login.username",
                "password": "$results.login.password",
                "salt": "$results.login.salt",
                "md5": "$results.login.md5",
                "sha1": "$results.login.sha1",
                "sha256": "$results.login.sha256"
            },
            "email": '$results.email',
            "dob": '$results.dob',
            "registered": '$results.registered',
            "phone": '$results.phone',
            "cell": '$results.cell',
            "id": {
                "name": "$results.id.name",
                "value": "$results.id.value"
            },
            "picture": {
                "large": '$results.picture.large',
                "medium": '$results.picture.medium',
                "thumbnail": '$results.picture.thumbnail'
            },
            "nat": '$results.nat'
        }
    },
    {
        $out: 'users_step02'
    }
]);
//
quit();
