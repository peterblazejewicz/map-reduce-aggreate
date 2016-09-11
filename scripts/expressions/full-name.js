/**
 * defindes transformation for full name property
 */
'use strict';
var fullNameExpression = {
    $concat: [
        "$name.first",
        " ",
        "$name.last"
    ]
};
