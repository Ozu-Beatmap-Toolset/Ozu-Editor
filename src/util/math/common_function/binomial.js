const factorial = require('./factorial.js');

function compute(n, k) {
    return factorial.compute(n) / (factorial.compute(k) * factorial.compute(n-k));
}

module.exports = {
    compute
}