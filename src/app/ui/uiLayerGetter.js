const domChildrenRemover = require('../../util/dom/childrenRemover.js');

function getCleanUiLayer(hitObject) {
    uiLayer = hitObject.getElementsByClassName('hit-object-img-layer')[0];
    domChildrenRemover.removeAllChildren(uiLayer);
    return uiLayer;
}

function getCleanCanvasLayer(hitObject) {
    uiLayer = hitObject.getElementsByClassName('hit-object-canvas-layer')[0];
    domChildrenRemover.removeAllChildren(uiLayer);
    return uiLayer;
}

module.exports = {
    getCleanUiLayer,
    getCleanCanvasLayer
}