const factorial = require('./factorial.js');

function compute(n, k) {
    factorial.compute(n) / (factorial.compute(k) * factorial.compute(n-k));
}

module.exports = {
    compute
}