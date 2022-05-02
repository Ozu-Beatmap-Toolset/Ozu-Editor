const BezierCurve = require('./BezierCurve.js');
const Vector2 = require('../../vector/Vector2.js');
const binomial = require('../../common_function/binomial.js');

const INVALIDATION_SIZE = 100;

module.exports = class BezierSample {
    #bezierCurve;

    constructor(bezierCurve) {
        this.#bezierCurve = bezierCurve;
    }

    invalidateSegmentsAround(index) {
        const boundary = this.#getComputingBoundary(index);
        for(var i = boundary.start; i < boundary.stop; i++) {
            this.#bezierCurve.samples[i] = undefined;
        }
    }

    // N is the amount of samples
    sampleMissingSegments(N) {
        for(var i = 0; i < this.#bezierCurve.controlPoints.length-1; i++) {
            if(typeof this.#bezierCurve.samples[i] === 'undefined') {
                this.#bezierCurve.samples[i] = [];
                this.#sampleMissingSegment(N, i)
            }
        }
    }

    #sampleMissingSegment(N, i) {
        const amountOfSamplesPerSegment = N/this.#bezierCurve.controlPoints.length;
        for(var j = 0; j < amountOfSamplesPerSegment; j++) {
            const n = this.#bezierCurve.controlPoints.length-1;
            const t = i/n + j/(n*amountOfSamplesPerSegment);
            this.#bezierCurve.samples[i][j] = this.#approximateComputeAt(t, i);
        }
    }
    
    // t is the current parametric value to compute at, i is the current index to sample
    #approximateComputeAt(t, i) {
        if(this.#bezierCurve.controlPoints.length == 0) {
            return new Vector2(NaN, NaN);
        }
        if(this.#bezierCurve.controlPoints.length == 1) {
            return this.controlPoints[0];
        }

        var result = new Vector2(0, 0);
        const n = this.#bezierCurve.controlPoints.length-1;

        const boundary = this.#getComputingBoundary(i);
        for(var k = boundary.start; k < boundary.stop; k++) {
            const bin = binomial.getOrCompute(n, k);
            const exponents = Math.pow(1-t, n-k) * Math.pow(t, k);
            const scalar = bin * exponents;
            result = result.plus(this.#bezierCurve.controlPoints[k].scaled(scalar));
        }

        return result;
    }

    #getComputingBoundary(index) {
        const start = Math.max(parseInt(index - INVALIDATION_SIZE/2), 0);
        const stop = Math.min(parseInt(index + INVALIDATION_SIZE/2 + 1), this.#bezierCurve.controlPoints.length);

        return {start, stop};
    }
}