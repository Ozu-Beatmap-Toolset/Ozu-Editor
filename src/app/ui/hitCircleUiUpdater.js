const skinData = require('./skinData.js');
const uiLayerGetter = require('./uiLayerGetter.js');

function draw(hitCircle) {
    uiLayer = uiLayerGetter.getCleanUiLayer(hitCircle);

    addImageToUiLayer(skinData.skinDict['hitcircle'], uiLayer);
    addImageToUiLayer(skinData.skinDict['hitcircleoverlay'], uiLayer);
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
    draw
}