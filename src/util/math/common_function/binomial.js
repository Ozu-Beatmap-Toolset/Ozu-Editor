const factorial = require('./factorial.js');

const lut = [[]];

function getOrCompute(n, k) {
    if(typeof lut[n] === 'undefined') {
        lut[n] = [];
    }
    if(typeof lut[n][k] === 'undefined') {
        lut[n][k] = factorial.compute(n) / (factorial.compute(k) * factorial.compute(n-k));
    }
    return lut[n][k];
}

module.exports = {
    getOrCompute
}