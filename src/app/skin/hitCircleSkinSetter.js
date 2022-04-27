const skinData = require('../skin/skinData.js');
const domChildrenRemover = require('../../util/dom/childrenRemover.js');

function updateSkin(hitCircle) {
    hideDefaultSkinContainer(hitCircle);
    uiLayer = hitCircle.getElementsByClassName('hit-object-img-layer')[0];
    domChildrenRemover.removeAllChildren(uiLayer);
    addImageToUiLayer(skinData.skinDict['hitcircle'], uiLayer);
    addImageToUiLayer(skinData.skinDict['hitcircleoverlay'], uiLayer);
}

function hideDefaultSkinContainer(hitCircle) {
    hitCircle.style.setProperty('height', '0px');
    hitCircle.style.setProperty('width', '0px');
    hitCircle.style.setProperty('background', 'none');
    hitCircle.style.setProperty('border-radius', '0px');
    hitCircle.style.setProperty('border', 'none');
}

function addImageToUiLayer(src, uiLayer) {
    const imgElement = document.createElement('img');
    imgElement.src = src;
    imgElement.draggable = false;
    imgElement.classList.add('hit-circle-ui');
    imgElement.style.setProperty('position', 'absolute');
    uiLayer.appendChild(imgElement);
}

module.exports = {
    updateSkin
}