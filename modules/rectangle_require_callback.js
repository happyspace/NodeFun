/**
 * Created by Eddie Warner on 6/24/2016.
 */

let validate = require('./rectangle_class_callback');

function solveRect(l,b) {
    console.log("Solving for rectangle with l = "
        + l + " and b = " + b);
    validate(l,b, function(err, Rectangle) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("The area of a rectangle of dimensions length = "
                + l + " and breadth = " + b + " is " + Rectangle.area(1,b));
            console.log("The perimeter of a rectangle of dimensions length = "
                + l + " and breadth = " + b + " is " + Rectangle.perimeter(1,b));
        }
    });
}

solveRect(2,4);
solveRect(3,5);
solveRect(-3,5);
