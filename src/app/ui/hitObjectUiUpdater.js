const hitCircleSkinSetter = require('./hitCircleUiUpdater.js');
const hitSliderSkinSetter = require('./hitSliderUiUpdater.js');
const hitSpinnerSkinSetter = require('./hitSpinnerUiUpdater.js');

function redrawAll() {
    const hitCircles = document.getElementsByClassName('placed-circle');
    for (const hitCircle of hitCircles) {
        hitCircleSkinSetter.draw(hitCircle);
    }
    const hitSliders = document.getElementsByClassName('placed-slider');
    for (const hitSlider of hitSliders) {
        hitSliderSkinSetter.draw(hitSlider);
    }
    const hitSpinners = document.getElementsByClassName('placed-spinner');
    for (const hitSpinner of hitSpinners) {
        hitSpinnerSkinSetter.draw(hitSpinner);
    }
}

module.exports = {
    redrawAll
}