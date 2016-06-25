/**
 * Export ES6 class with static functions.
 *
 * Takes the place of the following from class.
 * exports.perimeter = function (x, y) {
        return (2*(x+y));
}

 exports.area = function (x, y) {
        return (x*y);
}
 */

module.exports = class Rectangle {
    static area(x, y) {
        return (x*y);
    }
    static perimeter (x, y){
        return (2*(x+y));
    }
}
