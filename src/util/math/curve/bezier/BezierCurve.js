const ParametricCurve = require('../ParametricCurve.js');
const binomial = require('../../common_function/binomial.js');
const Vector2 = require('../../vector/Vector2.js');

module.exports = class BezierCurve extends ParametricCurve {
    #controlPoints;

    constructor(controlPoints) {
        super();
        this.#controlPoints = controlPoints;
        if(controlPoints.length == 0) {
            this.#controlPoints = [new Vector2(0, 0)];
        }
    }

    // https://en.wikipedia.org/wiki/B%C3%A9zier_curve#:~:text=the%20animations%20below.-,Explicit%20definition,-%5Bedit%5D
    compute(t) {
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

    derivative2nd(t) {
        const P = this.#controlPoints;
        const n = P.length-1;
        var result = new Vector2(0, 0);
        for(var i = 0; i < P.length; i++) {
            const bin = binomial.compute(n, i);
            // derivation with respect to t, only the factors containing t are affected
            const scalarPart1 = (n-1)*(n-i-1)*Math.pow(1-t, n-i-2)*Math.pow(t, i) + (i-n)*Math.pow(1-t, n-i-1)*i*Math.pow(t, i-1);
            const scalarPart2 = (i-n)*Math.pow(1-t, n-i-1)*i*Math.pow(t, i-1) + Math.pow(1-t, n-i)*i*(i-1)*Math.pow(t, i-2);
            const scalar = scalarPart1 + scalarPart2
            result = result.plus(P[i].scaled(bin * scalar));
        }
        return result;
    }

    order() {
        return this.#controlPoints.length-1;
    }

    length() {
        return 1;
    }

    controlPointsDistance() {
        var distance = 0;
        for(var i = 1; i < this.#controlPoints.length; i++) {
            distance += this.#controlPoints[i-1].distance(this.#controlPoints[i]);
        }
        return distance;
    }
}