const Playfield = require('../playfield/Playfield.js');
const MeasureBarPosRet = require('../measure_bar/MeasureBarPositionRetriever.js');

function updateTransparency(measureBarPosition) {
    const parent = Playfield.asDomElement();
    for(const domHitObject of parent.children) {
        updateVisibility(measureBarPosition, domHitObject);
        updateOpacity(measureBarPosition, domHitObject);
    }
}

function updateVisibility(measureBarPosition, domHitObject) {
    domHitObject.style.setProperty('visibility', visibilityFunction(measureBarPosition, domHitObject));
}

function updateOpacity(measureBarPosition, domHitObject) {
    domHitObject.style.setProperty('opacity', opacityFunction(measureBarPosition, domHitObject));
}

function visibilityFunction(measureBarPosition, domHitObject) {
    const transparency = transparencyFunction(measureBarPosition, domHitObject);
    if(transparency < 0) {
        return 'hidden';
    }
    return 'visible';
}

function opacityFunction(measureBarPosition, domHitObject) {
    const transparency = transparencyFunction(measureBarPosition, domHitObject);
    if(transparency > 1) {
        return '1';
    }
    if(transparency < 0) {
        return '0';
    }
    return String(transparency);
}

function transparencyFunction(measureBarPosition, domHitObject) {
    return 1 - Math.abs(measureBarPosition - MeasureBarPosRet.getPositionOfHitObject(domHitObject));
}

module.exports = {
    updateTransparency
}
