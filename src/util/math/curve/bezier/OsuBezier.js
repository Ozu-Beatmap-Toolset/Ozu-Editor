const ParametricCurve = require('../ParametricCurve.js');
const binomial = require('../../common_function/binomial.js');
const Vector2 = require('../../vector/Vector2.js');

module.exports = class OsuBezier extends ParametricCurve {
    #bezierCurve;
    #length = 0;

    constructor(bezierCurve) {
        super();
        this.#bezierCurve = bezierCurve;
    }

    compute(distance) {
        var points = [];
        const controlPointsDistance = this.#bezierCurve.controlPointsDistance();
        const resolution = parseInt(controlPointsDistance/50) + 2;

    }

    order() {
        return this.#bezierCurve.order();
    }

    length() {
        return this.#length;
    }

    setLength(length) {
        this.#length = length;
    }
}