import ParametricCurve from '../ParametricCurve.js';
import binomial from '../../common_function/binomial.js';
import Vector2 from '../../vector/Vector2.js';
import arcLengthApproximation from'../arc_length/arcLengthApproximation.js';

class BezierCurve extends ParametricCurve {
    controlPoints;
    samples = [];
    length = 1;

    constructor(controlPoints) {
        super();
        this.controlPoints = controlPoints;
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
        return distance * this.length;
    }
}

export default {
    BezierCurve
}