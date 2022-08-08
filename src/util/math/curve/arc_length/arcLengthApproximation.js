import Vector2 from '@/../src/util/math/vector/Vector2.js';
import gaussianQuadrature from '@/../src/util/math/integration/gaussianQuadrature.js';

function arcLength(derivative, t) {
    return arcLengthInterval(derivative, 0, t);
}

function arcLengthInterval(derivative, a, b) {
    const arcLengthDerivX = (t) => {
        return decoupledArcLengthDerivative(derivative, t).x; 
    };
    const arcLengthDerivY = (t) => {
        return decoupledArcLengthDerivative(derivative, t).y; 
    };
    const gauss = (func, c, d) => {
        return gaussianQuadrature.compute(func, c, d);
    }
    return new Vector2(gauss(arcLengthDerivX, a, b), gauss(arcLengthDerivY, a, b)).magnitude();
}
    
function decoupledArcLengthDerivative(derivative, t) {
    const computedDerivative = derivative(t);
    return new Vector2(
        Math.sqrt(1 + computedDerivative.x*computedDerivative.x), 
        Math.sqrt(1 + computedDerivative.y*computedDerivative.y));
}

export default {
    arcLength,
    arcLengthInterval
}