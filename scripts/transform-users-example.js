/**
 * Transforms users using Aggregate framework
 * Adds additional computed fields:
 * - week of dob
 * - month of dob
 * - quarter of dob
 * - full name
 */
// connection
var client = new Mongo();
var db = client.getDB('test');
//
load('expressions/full-name.js');
load('expressions/week.js');
load('expressions/day-of-week.js');
load('expressions/month.js');
load('expressions/quarter.js');
load('expressions/year.js');
// projection (transformation definition)
var projection = {
    gender: 1,
    name: {
        title: 1,
        first: 1,
        last: 1,
        fullName: fullNameExpression
    },
    location: 1,
    email: 1,
    dob: 1,
    registered: 1,
    phone: 1,
    cell: 1,
    id: 1,
    picture: 1,
    nat: 1,
    dayOfWeek: dayOfWeekExpression,
    week: weekExpression,
    month: monthExpression,
    quarter: quarterExpression,
    year: yearExpression
};
// transformation
db.users.aggregate([
    { $project: projection },
    { $out: 'users_updated' }
]);
//
var counter = db.users_updated.find().count();
if(counter > 1) {
    print('Updated users collection created');
} else {
    print('Failed to create updated collection');
}
//
quit();
