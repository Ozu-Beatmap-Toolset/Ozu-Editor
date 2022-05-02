const Vector2 = require('../../util/math/vector/Vector2.js');
const clamp = require('../../util/math/common_function/clamp.js');
require('../playfield/Playfield.js');
const playfieldConstants = require('../playfield/constants.js');
const hitSliderUiUpdater = require('../ui/hitSliderUiUpdater.js');
const BezierCurve = require('../../util/math/curve/bezier/BezierCurve.js');

function moveLastControlPointTo(pos, bezierCurve, playfield) {
    const controlPoints = JSON.parse(getComputedStyle(getDomObject()).getPropertyValue('--control-points'));
    const topLeftPlayfield = new Vector2(playfield.getPlayfieldRect().left, playfield.getPlayfieldRect().top);
    const cursorOnOsuGrid = playfield.playfieldPositionToOsuPixel(pos.minus(topLeftPlayfield));
    var x = cursorOnOsuGrid.x;
    var y = cursorOnOsuGrid.y;
    if(controlPoints.length == 1) {
        x = clamp.apply(x, 0, playfieldConstants.sizeX);
        y = clamp.apply(y, 0, playfieldConstants.sizeY);
    }
    controlPoints[controlPoints.length-1].x = x;
    controlPoints[controlPoints.length-1].y = y;
    getDomObject().style.setProperty('--control-points', JSON.stringify(controlPoints));

    hitSliderUiUpdater.draw(getDomObject(), bezierCurve, playfield);
}

function addControlPoint(pos, bezierCurve, playfield) {
    const controlPoints = JSON.parse(getComputedStyle(getDomObject()).getPropertyValue('--control-points'));
    const topLeftPlayfield = new Vector2(playfield.getPlayfieldRect().left, playfield.getPlayfieldRect().top);
    bezierCurve.addControlPoint(controlPoints.length, playfield.osuPixelToPlayfieldPosition(pos).minus(topLeftPlayfield));
    controlPoints.push({"x":pos.x, "y":pos.y});
    getDomObject().style.setProperty('--control-points', JSON.stringify(controlPoints));
}

function clearControlPoints() {
    getDomObject().style.setProperty('--control-points', JSON.stringify([]));
}

function getDomObject() {
    return document.querySelector('.unplaced-slider');
}

module.exports = {
    moveLastControlPointTo,
    getDomObject,
    addControlPoint,
    clearControlPoints
}
