/**
 * Yargs
 */

const argv = require('yargs')
    .usage('Usage: node $0 --l[num] --b[num]')
    .demand(['l','b'])
    .argv;


const validate = require('./rectangle_class_callback');

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


