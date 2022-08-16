function findT(length, arcLengthFunction, precision, maxIterationAmount) {
    let t = 0.5;
    let divisor = 0.51;
    let computedLength = arcLengthFunction(t);

    for(let i = 0; i < maxIterationAmount && Math.abs(length - computedLength) > precision; i++) {
        divisor *= 0.5;
        if(computedLength > length) {
            t -= divisor;
        }
        else {
            t += divisor;
        }
        computedLength = arcLengthFunction(t);
    }

    return t;
}

export default {
    findT
}