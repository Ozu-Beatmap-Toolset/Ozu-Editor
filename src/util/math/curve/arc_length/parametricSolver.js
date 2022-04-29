

function findT(length, arcLengthFunction, precision, maxIterationAmount) {
    var t = 0.5;
    var divisor = 0.51;
    var computedLength = arcLengthFunction(t);

    for(var i = 0; i < maxIterationAmount && Math.abs(length - computedLength) > precision; i++) {
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

module.exports = {
    findT
}