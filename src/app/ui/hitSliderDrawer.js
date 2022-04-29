const skinData = require('./skinData.js');
const uiLayerGetter = require('./uiLayerGetter.js');
const Vector2 = require('../../util/math/vector/Vector2.js');
const BezierCurve = require('../../util/math/curve/bezier/BezierCurve.js');
const OsuBezier = require('../../util/math/curve/bezier/OsuBezier.js');
const Playfield = require('../playfield/Playfield.js');
const curvature = require('../../util/math/curve/curvature.js');

function draw(hitSlider) {
    imgLayer = uiLayerGetter.getCleanUiLayer(hitSlider);
    canvasLayer = uiLayerGetter.getCleanCanvasLayer(hitSlider);
    
    // Bézier curve
    const controlPointsJson = JSON.parse(getComputedStyle(hitSlider).getPropertyValue('--control-points'));
    const controlPoints = [];
    
    for(const jsonObj of controlPointsJson) { controlPoints.push(Vector2.constructFromJson(jsonObj)); }
    const bezierCurve = new BezierCurve(controlPoints);
    const contextBundle = createContextBundleOn(canvasLayer);
    drawBezier(bezierCurve, contextBundle[0], contextBundle[1], '#e6e6e6', 'source-over', 118);
    drawBezier(bezierCurve, contextBundle[0], contextBundle[1], '#e6e6e6', 'destination-out', 102);

    //addImageToUiLayer(skinData.skinDict['hitcircle'], bezierCurve, imgLayer);
    //addImageToUiLayer(skinData.skinDict['hitcircleoverlay'], bezierCurve, imgLayer);
}

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
    return [context, canvasRect];
}

function drawBezier(bezierCurve, context, canvasRect, color, compositeOperation, width) {
    context.globalCompositeOperation = compositeOperation;
    context.strokeStyle = color;
    context.lineWidth = width;

    const offset = new Vector2(canvasRect.left, canvasRect.top);
    const start = bezierCurve.compute(0).plus(offset);
    const stop = bezierCurve.compute(1).plus(offset);

    // compute curvature now and previous efficiently (don't compute twice), don't print segments if the curvature is too high,
    // print circles where the curvature was too high
    context.beginPath();
    context.moveTo(start.x, start.y);
    const stepSize = 10/bezierCurve.fastUpperBoundArcLength();
    var currentPointOnCurve = bezierCurve.compute(t-stepSize).plus(offset);
    var nextPointOnCurve = bezierCurve.compute(t).plus(offset);
    var currentTengent = bezierCurve.derivative(t-stepSize);
    const x1 = Date.now();
    for(var t = 0; t <= 1; t+=stepSize) {
        const previousPointOnCurve = currentPointOnCurve;
        var currentPointOnCurve = nextPointOnCurve;
        var nextPointOnCurve = bezierCurve.compute(t+stepSize).plus(offset);
        const previousTengent = currentTengent;
        var currentTengent = bezierCurve.derivative(t);
        const previousCurvature = curvature.compute(previousTengent, previousPointOnCurve, currentPointOnCurve);
        const currentCurvature = curvature.compute(currentTengent, currentPointOnCurve, nextPointOnCurve);
        if(Math.abs(currentCurvature) > 0.7 || Math.abs(previousCurvature) > 0.7) {
            context.stroke();
            context.moveTo(currentPointOnCurve.x, currentPointOnCurve.y);

            context.beginPath();
            context.arc(currentPointOnCurve.x, currentPointOnCurve.y, width/2, 0, 2*Math.PI);
            context.fillStyle = color;
            context.fill();

            context.beginPath();
        }
        else {
            context.lineTo(currentPointOnCurve.x, currentPointOnCurve.y);
        }
    }
    const x2 = Date.now();
    console.log(x2-x1);
    context.stroke();
    
    context.beginPath();
    context.arc(start.x, start.y, width/2, 0, 2*Math.PI);
    context.fillStyle = color;
    context.fill();

    context.beginPath();
    context.arc(stop.x, stop.y, width/2, 0, 2*Math.PI);
    context.fillStyle = color;
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