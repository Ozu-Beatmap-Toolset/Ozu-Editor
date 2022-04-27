const skinData = require('../skin/skinData.js');
const domChildreRemover = require('../../util/dom/childrenRemover.js');

function updateSkinForAllHitObjects() {
    const hitCircles = document.getElementsByClassName('placed-circle');
    for (const hitCircle of hitCircles) {
        updateSkinOfHitCircle(hitCircle);
    }
    const hitSlicles = document.getElementsByClassName('placed-slicle');
    for (const hitSlicle of hitSlicles) {
        updateSkinOfHitSlicle(hitSlicle);
    }
    const hitSlizers = document.getElementsByClassName('placed-slizer');
    for (const hitSlizer of hitSlizers) {
        updateSkinOfHitSlizer(hitSlizer);
    }
    const hitSpinners = document.getElementsByClassName('placed-spinner');
    for (const hitSpinner of hitSpinners) {
        updateSkinOfHitSpinner(hitSpinner);
    }
}

function updateSkinOfHitCircle(hitCircle) {
    hitCircle.style.setProperty('height', '0px');
    hitCircle.style.setProperty('width', '0px');
    hitCircle.style.setProperty('background', 'none');
    hitCircle.style.setProperty('border-radius', '0px');
    hitCircle.style.setProperty('border', 'none');
    uiLayer = hitCircle.getElementsByClassName('hit-object-img-layer')[0];
    domChildreRemover.removeAllChildren(uiLayer);
    uiLayer.style.setProperty('display', 'flex');
    uiLayer.style.setProperty('justify-content', 'center');
    uiLayer.style.setProperty('align-items', 'center');
    const hitCircleImgElement = document.createElement('img');
    const hitCircleOverlayImgElement = document.createElement('img');
    hitCircleImgElement.src = skinData.skinDict['hitcircle'];
    hitCircleOverlayImgElement.src = skinData.skinDict['hitcircleoverlay'];
    hitCircleImgElement.draggable = false;
    hitCircleOverlayImgElement.draggable = false;
    hitCircleImgElement.classList.add('hit-circle-ui');
    hitCircleOverlayImgElement.classList.add('hit-circle-ui');
    hitCircleImgElement.style.setProperty('position', 'absolute');
    hitCircleOverlayImgElement.style.setProperty('position', 'absolute');
    uiLayer.appendChild(hitCircleImgElement);
    uiLayer.appendChild(hitCircleOverlayImgElement);
}

function updateSkinOfHitSlicle(hitSlicle) {

}

function updateSkinOfHitSlizer(hitSlizer) {

}

function updateSkinOfHitSpinner(hitSpinner) {

}

module.exports = {
    updateSkinForAllHitObjects,
    updateSkinOfHitCircle,
    updateSkinOfHitSlicle,
    updateSkinOfHitSlizer,
    updateSkinOfHitSpinner
}