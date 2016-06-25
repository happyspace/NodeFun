/**
 * Use class object in callback.
 */
"use strict";
let Rectangle = require('./rectange_class_export');

module.exports = function validate(x, y, callback) {
    try {
        if (x < 0 || y < 0) {
            throw new Error("Rectangle dimensions should be greater than zero: l = "
                + x + ", and b = " + y);
        }
        else
            callback(null, Rectangle);
    }
    catch (error) {
        callback(error,null);
    }
};



