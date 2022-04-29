const skinData = require('./skinData.js');
const uiLayerGetter = require('./uiLayerGetter.js');
const Vector2 = require('../../util/math/vector/Vector2.js');
const BezierCurve = require('../../util/math/curve/bezier/BezierCurve.js');
const OsuBezier = require('../../util/math/curve/bezier/OsuBezier.js');
const Playfield = require('../playfield/Playfield.js');
const canvasContextBundleCreator = require('./canvasContextBundleCreator.js');
const parametricSolver = require('../../util/math/curve/arc_length/parametricSolver.js');

const MAX_ALLOWED_STEP_ANGLE = 0.7;
const BORDER_COLOR = '#e6e6e6';
const UNUSED = '#000000';
const SLIDER_BODY_MAIN_GRADIENT_COLOR = 'rgba(128, 128, 128)';
const SLIDER_BODY_SECONDARY_GRADIENT_COLOR = 'rgba(0, 0, 0)'

function draw(hitSlider) {
    imgLayer = uiLayerGetter.getCleanUiLayer(hitSlider);
    canvasLayer = uiLayerGetter.getCleanCanvasLayer(hitSlider);
    
    // Bézier curve
    const controlPointsJson = JSON.parse(getComputedStyle(hitSlider).getPropertyValue('--control-points'));
    const controlPoints = [];
    for(const jsonObj of controlPointsJson) { controlPoints.push(Vector2.constructFromJson(jsonObj)); }
    const bezierCurve = new BezierCurve(controlPoints);
    bezierCurve.length = parseFloat(getComputedStyle(hitSlider).getPropertyValue('--bezier-length'));

    const borderContextBundle = canvasContextBundleCreator.createContextBundleOn(canvasLayer);
    const bodyContextBundle = canvasContextBundleCreator.createContextBundleOn(canvasLayer);
    // draw the border
    drawBezierComponent(bezierCurve, borderContextBundle[0], borderContextBundle[1], BORDER_COLOR, 'source-over', 120, drawBodySegment, drawCircle);
    // erase the center of the border
    drawBezierComponent(bezierCurve, borderContextBundle[0], borderContextBundle[1], BORDER_COLOR, 'destination-out', 105, drawBodySegment, drawCircle);
    // draw the gradient behind the border
    drawBezierComponent(bezierCurve, bodyContextBundle[0], bodyContextBundle[1], UNUSED, 'lighten', 105, drawBodySegmentGradient, drawCircleGradient);
    bodyContextBundle[2].style.opacity = 0.2;

    //addImageToUiLayer(skinData.skinDict['hitcircle'], bezierCurve.compute(0), imgLayer);
    //addImageToUiLayer(skinData.skinDict['hitcircleoverlay'], bezierCurve.compute(0), imgLayer);
}

function drawBezierComponent(bezierCurve, context, canvasRect, color, compositeOperation, width, segmentDrawingFunction, circleDrawingFunction) {
    context.globalCompositeOperation = compositeOperation;
    context.fillStyle = color;
    context.strokeStyle = color;
    context.lineWidth = width;

    const offset = new Vector2(canvasRect.left, canvasRect.top);
    const start = bezierCurve.compute(0).plus(offset);
    const stop = bezierCurve.compute(bezierCurve.length).plus(offset);

    const centerOfCirclesToDraw = [start, stop];

    context.beginPath();
    context.moveTo(start.x, start.y);
    const stepSize = 20/bezierCurve.fastUpperBoundArcLength();
    const numIterations = parseInt(1/stepSize);
    var currentPointOnCurve = bezierCurve.compute(-stepSize).plus(offset);
    var nextPointOnCurve = bezierCurve.compute(0).plus(offset);
    var currentTengent = bezierCurve.derivative(-stepSize);
    var nextTengent = bezierCurve.derivative(0);
    const x1 = Date.now();
    for(var i = 0; i < numIterations * bezierCurve.length; i++) {
        const t = i/numIterations;
        const previousPointOnCurve = currentPointOnCurve;
        currentPointOnCurve = nextPointOnCurve;
        nextPointOnCurve = bezierCurve.compute(t+stepSize).plus(offset);
        const previousTengent = currentTengent;
        currentTengent = nextTengent;
        nextTengent = bezierCurve.derivative(t+stepSize);
        const currentStepAngle = currentTengent.angleFrom(nextTengent);
        const previousStepAngle = previousTengent.angleFrom(currentTengent);
        if(!currentPointOnCurve.isFinite() || !currentTengent.isFinite()) {
            continue;
        }
        if(Math.abs(currentStepAngle) > MAX_ALLOWED_STEP_ANGLE || Math.abs(previousStepAngle) > MAX_ALLOWED_STEP_ANGLE) {
            centerOfCirclesToDraw.push(currentPointOnCurve);
            context.moveTo(currentPointOnCurve.x, currentPointOnCurve.y);
        }
        else {
            segmentDrawingFunction(context, previousPointOnCurve, currentPointOnCurve, nextPointOnCurve, currentTengent, width);
        }
    }

    // complete the path
    if(bezierCurve.length < stepSize*2) {
        segmentDrawingFunction(context, start, stop, stop, nextTengent, width);
    }
    else {
        segmentDrawingFunction(context, bezierCurve.compute(bezierCurve.length-stepSize).plus(offset), bezierCurve.compute(bezierCurve.length).plus(offset), bezierCurve.compute(bezierCurve.length).plus(offset), nextTengent, width);
    }
    const x2 = Date.now();
    //console.log(x2-x1);
    context.stroke();

    for(const center of centerOfCirclesToDraw) {
        circleDrawingFunction(context, center, width/2);
    }
}

function drawBodySegment(context, previousPosition, position, nextPosition, velocity, width) {
    context.lineJoin = 'round';
    context.lineTo(position.x, position.y);
}

function drawBodySegmentGradient(context, previousPosition, position, nextPosition, velocity, width) {
    const perp = velocity.rotate(Math.PI*0.5).scaledToMagnitude(width*0.5);
    const gradPoint1 = position.plus(perp);
    const gradPoint2 = position.minus(perp);

    if(gradPoint1.isFinite() && gradPoint2.isFinite()) {
        const gradient = context.createLinearGradient(gradPoint1.x, gradPoint1.y, gradPoint2.x, gradPoint2.y);
        gradient.addColorStop(0, SLIDER_BODY_SECONDARY_GRADIENT_COLOR);
        gradient.addColorStop(0.5, SLIDER_BODY_MAIN_GRADIENT_COLOR);
        gradient.addColorStop(1, SLIDER_BODY_SECONDARY_GRADIENT_COLOR);
        context.beginPath();
        context.moveTo(previousPosition.x, previousPosition.y);
        context.lineTo(position.x, position.y);
        context.lineTo(nextPosition.x, nextPosition.y);
        context.strokeStyle = gradient;
        context.lineJoin = 'round';
        context.stroke();
    }
}

function drawCircle(context, center, radii) {
    context.beginPath();
    context.arc(center.x, center.y, radii, 0, 2*Math.PI);
    context.fill();
}

function drawCircleGradient(context, center, radii) {
    const gradient = context.createRadialGradient(center.x, center.y, 0, center.x, center.y, radii);
    gradient.addColorStop(0, SLIDER_BODY_MAIN_GRADIENT_COLOR);
    gradient.addColorStop(1, SLIDER_BODY_SECONDARY_GRADIENT_COLOR);
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(center.x, center.y, radii, 0, 2*Math.PI);
    context.fill();
}

function addImageToUiLayer(src, position, uiLayer) {
    const imgElement = document.createElement('img');
    uiLayer.appendChild(imgElement);
    imgElement.src = src;
    imgElement.draggable = false;
    imgElement.style.left = String(parseInt(position.x - imgElement.naturalWidth/2)) + "px";
    imgElement.style.top = String(parseInt(position.y - imgElement.naturalHeight/2)) + "px";
    imgElement.classList.add('hit-slider-ui');
    imgElement.style.setProperty('position', 'absolute');
}

module.exports = {
    draw
}