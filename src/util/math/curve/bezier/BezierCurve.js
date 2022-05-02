const ParametricCurve = require('../ParametricCurve.js');
const binomial = require('../../common_function/binomial.js');
const Vector2 = require('../../vector/Vector2.js');
const arcLengthApproximation = require('../arc_length/arcLengthApproximation.js');
const BezierCurveSampler = require("./BezierSampler.js");

module.exports = class BezierCurve extends ParametricCurve {
    controlPoints;
    samples = [];
    length = 1;
    bezierSampler;

    constructor(controlPoints) {
        super();
        this.controlPoints = controlPoints;
        this.bezierSampler = new BezierCurveSampler(this);
    }

    addControlPoint(index, controlPoint) {
        this.controlPoints.splice(index, 0, controlPoint);
        this.samples.splice(index, 0, []);
        this.moveControlPoint(index, controlPoint);
    }

    moveControlPoint(index, destination) {
        this.bezierSampler.invalidateSegmentsAround(index);
        this.controlPoints[index] = destination;
    }

    sample(N) {
        this.bezierSampler.sampleMissingSegments(N);

        const packedSamples = [];
        for(const segment of this.samples) {
            if(typeof segment !== 'undefined') {
                for(const e of segment) {
                    packedSamples.push(e);
                }
            }
        }

        if(packedSamples.length == 0) {
            packedSamples.push(this.controlPoints[0])
        }

        return packedSamples;
    }

    sample2(N) {
        const samples = [];

        for(var i = 0; i < N; i++) {
            const t = i/N;
            samples.push(this.compute(t));
        }

        return samples;
    }

    // https://en.wikipedia.org/wiki/B%C3%A9zier_curve#:~:text=the%20animations%20below.-,Explicit%20definition,-%5Bedit%5D
    compute(t) {
        if(this.controlPoints.length == 0) {
            return new Vector2(NaN, NaN);
        }
        if(this.controlPoints.length == 1) {
            return this.controlPoints[0];
        }
        var n = this.controlPoints.length-1;
        var result = new Vector2(0, 0);
        for(var i = 0; i < n+1; i++) {
            const bin = binomial.getOrCompute(n, i);
            const scalar = Math.pow(1-t, n-i) * Math.pow(t, i);
            result = result.plus(this.controlPoints[i].scaled(bin * scalar));
        }
        return result;
    }

    derivative(t) {
        if(this.controlPoints.length == 1) {
            return new Vector2(0, 0);
        }
        const P = this.controlPoints;
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
        return this.controlPoints.length-1;
    }

    fastUpperBoundArcLength() {
        var distance = 0;
        for(var i = 1; i < this.controlPoints.length; i++) {
            distance += this.controlPoints[i-1].distance(this.controlPoints[i]);
        }
        return distance;
    }
}