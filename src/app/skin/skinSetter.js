const hitCircleSkinSetter = require('./hitCircleSkinSetter.js');
const hitSlicleSkinSetter = require('./hitSlicleSkinSetter.js');
const hitSlizerSkinSetter = require('./hitSlizerSkinSetter.js');
const hitSpinnerSkinSetter = require('./hitSpinnerSkinSetter.js');

function updateSkinForAllHitObjects() {
    const hitCircles = document.getElementsByClassName('placed-circle');
    for (const hitCircle of hitCircles) {
        hitCircleSkinSetter.updateSkin(hitCircle);
    }
    const hitSlicles = document.getElementsByClassName('placed-slicle');
    for (const hitSlicle of hitSlicles) {
        hitSlicleSkinSetter.updateSkin(hitSlicle);
    }
    const hitSlizers = document.getElementsByClassName('placed-slizer');
    for (const hitSlizer of hitSlizers) {
        hitSlizerSkinSetter.updateSkin(hitSlizer);
    }
    const hitSpinners = document.getElementsByClassName('placed-spinner');
    for (const hitSpinner of hitSpinners) {
        hitSpinnerSkinSetter.updateSkin(hitSpinner);
    }
}

module.exports = {
    updateSkinForAllHitObjects
}