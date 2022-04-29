const ParametricCurve = require('../ParametricCurve.js');
const binomial = require('../../common_function/binomial.js');
const Vector2 = require('../../vector/Vector2.js');
const arcLengthApproximation = require('../arc_length/arcLengthApproximation.js');

module.exports = class BezierCurve extends ParametricCurve {
    #controlPoints;
    length = 1;

    constructor(controlPoints) {
        super();
        this.#controlPoints = controlPoints;
        if(controlPoints.length == 0) {
            this.#controlPoints = [new Vector2(0, 0)];
        }
    }

    // https://en.wikipedia.org/wiki/B%C3%A9zier_curve#:~:text=the%20animations%20below.-,Explicit%20definition,-%5Bedit%5D
    compute(t) {
        // handling discontinuities
        if(this.#controlPoints.length == 1) {
            return this.#controlPoints[0];
        }
        const P = this.#controlPoints;
        const n = P.length-1;
        var result = new Vector2(0, 0);
        for(var i = 0; i < P.length; i++) {
            const bin = binomial.compute(n, i);
            const scalar = Math.pow(1-t, n-i) * Math.pow(t, i);
            result = result.plus(P[i].scaled(bin * scalar));
        }
        return result;
    }

    derivative(t) {
        if(this.#controlPoints.length == 1) {
            return 0;
        }
        const P = this.#controlPoints;
        const n = P.length-1;
        var result = new Vector2(0, 0);
        for(var i = 0; i < P.length; i++) {
            const bin = binomial.compute(n, i);
            // derivation with respect to t, only the factors containing t are affected
            const scalar = (i-n)*Math.pow(1-t, n-i-1) * Math.pow(t, i)
                               + Math.pow(1-t, n-i) * i*Math.pow(t, i-1);
            result = result.plus(P[i].scaled(bin * scalar));
        }
        return result;
    }

    arcLength(t) {
        const derivative = (p) => { 
            return this.derivative(p); 
        };
        return arcLengthApproximation.arcLength(derivative, t);
    }

    order() {
        return this.#controlPoints.length-1;
    }

    fastUpperBoundArcLength() {
        var distance = 0;
        for(var i = 1; i < this.#controlPoints.length; i++) {
            distance += this.#controlPoints[i-1].distance(this.#controlPoints[i]);
        }
        return distance;
    }
}