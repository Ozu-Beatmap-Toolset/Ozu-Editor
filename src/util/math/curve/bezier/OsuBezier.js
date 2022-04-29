const ParametricCurve = require('../ParametricCurve.js');
const binomial = require('../../common_function/binomial.js');
const Vector2 = require('../../vector/Vector2.js');
const BezierCurve = require('./BezierCurve.js')
const parametricSolver = require('../arc_length/parametricSolver.js');

module.exports = class OsuBezier extends ParametricCurve {
    #bezierCurve;
    length = 0;

    constructor(bezierCurve) {
        super();
        this.#bezierCurve = bezierCurve;
    }

    compute(distance) {
        const t = parametricSolver.findT(distance, (p) => { return this.#bezierCurve.arcLength(p); }, 5, 10);
        return this.#bezierCurve.compute(t);
    }

    order() {
        return this.#bezierCurve.order();
    }
}