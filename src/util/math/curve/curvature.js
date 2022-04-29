require('../vector/Vector2.js')

// the tangent is on point1, point2 is used as an achor point
function compute(tangent, point1, point2) {
    const adjVec = point2.minus(point1);
    const perp = tangent.rotate(Math.PI/2);
    const adj = adjVec.magnitude()/2;
    const theta = adjVec.angleFrom(perp);

    return Math.cos(theta)/adj;
}

module.exports = {
    compute
}