"use strict";
var Person = /** @class */ (function () {
    function Person() {
        this.firstName = 'John';
        this.lastName = 'Doe';
    }
    return Person;
}());
var Factory = /** @class */ (function () {
    function Factory() {
    }
    Factory.prototype.create = function (type) {
        return new type();
    };
    return Factory;
}());
var factory = new Factory();
var person = factory.create(Person);
console.log(person);
