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

    sample(stepSize) {
        const samples = [this.#controlPoints[0]];
        for(var t = stepSize; t < this.length; t+= stepSize) {
            samples.push(this.compute(t));
        }
        samples.push(this.compute(this.length));
        return samples;
    }

    // like sample(stepSize), but tries to distribute the points more evenly on the curve
    roughDistributedSample(N) {
        const samples = [this.#controlPoints[0]];
        const A = this.fastUpperBoundArcLength();
        var pSum = 0;

        for(var k = 1; k < this.#controlPoints.length; k++) {
            const Ik = this.#controlPoints[k].distance(this.#controlPoints[k-1]);
            const P = Ik/A;
            const amountOfPoints = P*N;
            for(var i = 0; i < amountOfPoints; i++) {
                const pos = i/amountOfPoints;
                samples.push(this.compute(pSum + pos*P));
            }
            pSum += P;
        }
        samples.push(this.compute(this.length));
        return samples;
    }

    toJsonString() {
        return JSON.stringify(this.#controlPoints);
    }

    // https://en.wikipedia.org/wiki/B%C3%A9zier_curve#:~:text=the%20animations%20below.-,Explicit%20definition,-%5Bedit%5D
    compute(t) {
        if(this.#controlPoints.length == 1) {
            return this.#controlPoints[0];
        }
        var n = this.#controlPoints.length-1;
        var result = new Vector2(0, 0);
        for(var i = 0; i < n+1; i++) {
            const bin = binomial.getOrCompute(n, i);
            const scalar = Math.pow(1-t, n-i) * Math.pow(t, i);
            result = result.plus(this.#controlPoints[i].scaled(bin * scalar));
        }
        return result;
    }

    derivative(t) {
        if(this.#controlPoints.length == 1) {
            return new Vector2(0, 0);
        }
        const P = this.#controlPoints;
        const n = P.length-1;
        var result = new Vector2(0, 0);
        for(var i = 0; i < P.length; i++) {
            const bin = binomial.getOrCompute(n, i);
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