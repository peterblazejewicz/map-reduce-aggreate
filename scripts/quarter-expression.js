'use strict';
const QUARTER_1 = 1;
const QUARTER_2 = 2;
const QUARTER_3 = 3;
const QUARTER_4 = 4;
/**
 * Define transformation for quarter field
 */
var quarterExpression = {
    $cond: {
        if: {
            $gt: [
                { $month: "$dob" },
                9
            ]
        },
        then: QUARTER_4,
        else: {
            $cond: {
                if: {
                    $gt: [{
                        $month: "$dob"
                    },
                        6]
                },
                then: QUARTER_3,
                else: {
                    $cond: {
                        if: {
                            $gt: [{
                                $month: "$dob"
                            },
                                3]
                        },
                        then: QUARTER_2,
                        else: QUARTER_1
                    }
                }
            }
        }
    }
};
