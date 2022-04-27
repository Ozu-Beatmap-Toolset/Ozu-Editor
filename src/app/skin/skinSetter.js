const skinData = require('../skin/skinData.js');

function updateSkinForAllHitCircles() {
    const hitCircles = document.getElementsByClassName('placed-circle');
    for (const hitCircle of hitCircles) {
        updateSkinOfHitCircle(hitCircle);
    }
}

function updateSkinOfHitCircle(hitCircle) {
    hitCircle.style.setProperty('height', '0px');
    hitCircle.style.setProperty('width', '0px');
    hitCircle.style.setProperty('background', 'none');
    hitCircle.style.setProperty('border-radius', '0px');
    hitCircle.style.setProperty('border', 'none');
    uiLayer = hitCircle.getElementsByClassName('hit-object-img-layer')[0];
    while (uiLayer.firstChild) {
        uiLayer.removeChild(uiLayer.lastChild);
    }
    uiLayer.style.setProperty('display', 'flex');
    uiLayer.style.setProperty('justify-content', 'center');
    uiLayer.style.setProperty('align-items', 'center');
    const hitCircleImgElement = document.createElement('img');
    const hitCircleOverlayImgElement = document.createElement('img');
    hitCircleImgElement.src = skinData.skinDict['hitcircle'];
    hitCircleOverlayImgElement.src = skinData.skinDict['hitcircleoverlay'];
    hitCircleImgElement.classList.add('hit-circle-ui');
    hitCircleOverlayImgElement.classList.add('hit-circle-ui');
    hitCircleImgElement.style.setProperty('position', 'absolute');
    hitCircleOverlayImgElement.style.setProperty('position', 'absolute');
    uiLayer.appendChild(hitCircleImgElement);
    uiLayer.appendChild(hitCircleOverlayImgElement);
}

module.exports = {
    updateSkinForAllHitCircles,
    updateSkinOfHitCircle
}