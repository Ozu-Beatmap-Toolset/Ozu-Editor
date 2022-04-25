const Playfield = require('../playfield/Playfield.js');

function updateVisibility(measureBarPosition, domHitObject) {
    if(transparencyFunction(measureBarPosition, domHitObject) < 0.01) {
        domHitObject.style.setProperty('visibility', 'hidden');
    } else {
        domHitObject.style.setProperty('visibility', 'visible');
    }
}

function updateOpacity(measureBarPosition, domHitObject) {
    var newOpacity = transparencyFunction(measureBarPosition, domHitObject);
    domHitObject.style.setProperty('opacity', String(newOpacity));
}

function updateTransparency(measureBarPosition) {
    const parent = Playfield.getHitObjectsParent();
    for(const domHitObject of parent.children) {
        updateVisibility(measureBarPosition, domHitObject);
        updateOpacity(measureBarPosition, domHitObject);
    }
}

function transparencyFunction(measureBarPosition, domHitObject) {
    const result = 2 - Math.abs(measureBarPosition - Playfield.getMeasureBarPositionOfHitObject(domHitObject));
    if(result > 1) {
        return 1;
    }
    if(result < 0) {
        return 0;
    }
    return result;
}

module.exports = {
    updateTransparency
}
