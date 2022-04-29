function createContextBundleOn(canvasLayer) {
    const canvasElement = document.createElement('canvas');
    canvasLayer.appendChild(canvasElement);
    canvasElement.style.position = "absolute";
    const canvasRect = canvasElement.getBoundingClientRect()
    canvasElement.style.left = String(-canvasRect.left) + "px";
    canvasElement.style.top = String(-canvasRect.top) + "px";
    const context = canvasElement.getContext('2d');
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    return [context, canvasRect, canvasElement];
}

module.exports = {
    createContextBundleOn
}