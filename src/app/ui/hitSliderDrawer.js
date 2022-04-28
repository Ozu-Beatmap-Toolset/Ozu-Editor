const skinData = require('./skinData.js');
const uiLayerGetter = require('./uiLayerGetter.js');
const Vector2 = require('../../util/math/vector/Vector2.js');
const BezierCurve = require('../../util/math/curve/bezier/BezierCurve.js');
const Playfield = require('../playfield/Playfield.js');

function draw(hitSlider) {
    imgLayer = uiLayerGetter.getCleanUiLayer(hitSlider);
    canvasLayer = uiLayerGetter.getCleanCanvasLayer(hitSlider);
    
    // Bézier curve
    const controlPointsJson = JSON.parse(getComputedStyle(hitSlider).getPropertyValue('--control-points'));
    const controlPoints = [];
    
    for(const jsonObj of controlPointsJson) { controlPoints.push(Vector2.constructFromJson(jsonObj)); }
    const bezierCurve = new BezierCurve(controlPoints);
    printBezier(bezierCurve, canvasLayer);


    //addImageToUiLayer(skinData.skinDict['hitcircle'], bezierCurve, imgLayer);
    //addImageToUiLayer(skinData.skinDict['hitcircleoverlay'], bezierCurve, imgLayer);
}

function printBezier(bezierCurve, canvasLayer) {
    const canvasElement = document.createElement('canvas');
    canvasLayer.appendChild(canvasElement);
    canvasElement.style.position = "absolute";
    const canvasRect = canvasElement.getBoundingClientRect()
    canvasElement.style.left = String(-canvasRect.left) + "px";
    canvasElement.style.top = String(-canvasRect.top) + "px";
    const context = canvasElement.getContext('2d');
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    const borderColor = '#e6e6e6';

    context.globalCompositeOperation = 'source-over';
    const offset = new Vector2(canvasRect.left, canvasRect.top);
    context.beginPath();
    const start = bezierCurve.compute(0).plus(offset);
    context.moveTo(start.x, start.y);
    const stepSize = 0.05/(bezierCurve.order()+1);
    for(var t = 0; t <= bezierCurve.length(); t+=stepSize) {
        const pointOnCurve = bezierCurve.compute(t).plus(offset);
        context.lineTo(pointOnCurve.x, pointOnCurve.y);
    }
    context.strokeStyle = borderColor;
    context.lineWidth = 117;
    context.stroke();
    
    context.beginPath();
    context.arc(start.x, start.y, context.lineWidth/2, 0, 2 * Math.PI);
    context.fillStyle = borderColor;
    context.fill();

    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.lineWidth = 105;
    context.strokeStyle = borderColor;
    context.moveTo(start.x, start.y);
    for(var t = 0; t <= bezierCurve.length(); t+=stepSize) {
        const pointOnCurve = bezierCurve.compute(t).plus(offset);
        context.lineTo(pointOnCurve.x, pointOnCurve.y);
    }
    context.stroke();
    
    context.beginPath();
    context.arc(start.x, start.y, context.lineWidth/2, 0, 2 * Math.PI);
    context.fillStyle = borderColor;
    context.fill();
}

function addImageToUiLayer(src, bezierCurve, uiLayer) {
    const imgElement = document.createElement('img');
    uiLayer.appendChild(imgElement);
    imgElement.src = src;
    imgElement.draggable = false;
    const pos = bezierCurve.compute(0);
    imgElement.style.left = String(parseInt(pos.x - imgElement.naturalWidth/2)) + "px";
    imgElement.style.top = String(parseInt(pos.y - imgElement.naturalHeight/2)) + "px";
    imgElement.classList.add('hit-slider-ui');
    imgElement.style.setProperty('position', 'absolute');
}

module.exports = {
    draw
}