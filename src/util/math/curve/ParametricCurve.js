module.exports = class ParametricCurve {
    compute(t) {
        throw new Error('cannot call abstract method "compute(t)" from ParametricCurve object');
    }
}