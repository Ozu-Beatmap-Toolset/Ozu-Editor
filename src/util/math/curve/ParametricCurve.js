class ParametricCurve {
    compute(t) {
        throw new Error('cannot call abstract method "compute(t)" from abstract ParametricCurve object');
    }
}

export default {
    ParametricCurve
}