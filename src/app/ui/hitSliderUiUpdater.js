const skinData = require('./skinData.js');
const uiLayerGetter = require('./uiLayerGetter.js');
const Vector2 = require('../../util/math/vector/Vector2.js');
const BezierCurve = require('../../util/math/curve/bezier/BezierCurve.js');
const Playfield = require('../playfield/Playfield.js');
const canvasContextBundleCreator = require('./canvasContextBundleCreator.js');
const parametricSolver = require('../../util/math/curve/arc_length/parametricSolver.js');
const BezierSamplerClient = require('../../util/math/curve/bezier/BezierSamplerClient.js');

const MAX_ALLOWED_STEP_ANGLE = 0.7;
const BORDER_COLOR = '#e6e6e6';
const UNUSED = '#000000';
const SLIDER_BODY_MAIN_GRADIENT_COLOR = 'rgba(128, 128, 128)';
const SLIDER_BODY_SECONDARY_GRADIENT_COLOR = 'rgba(0, 0, 0)'

function draw(hitSlider, playfield) {
    var x1 = Date.now();

    // Bézier curve
    const controlPointsJson = JSON.parse(getComputedStyle(hitSlider).getPropertyValue('--control-points'));
    const controlPoints = [];
    for(const jsonObj of controlPointsJson) {
        const pos = playfield.osuPixelToPlayfieldPosition(Vector2.constructFromJson(jsonObj));
        controlPoints.push(pos); 
    }
    const bezierCurve = new BezierCurve(controlPoints);
    bezierCurve.length = parseFloat(getComputedStyle(hitSlider).getPropertyValue('--bezier-length'));
        
    // compute curve length
    const stepSize = 10/bezierCurve.arcLength(bezierCurve.length);
    //console.log(1/stepSize);

    var samples = [new Vector2(0, 0)];
    const sampler = new BezierSamplerClient();
    sampler.send(bezierCurve, 1/stepSize);
    sampler.onReceive((data) => {
        // receive data
        console.log(data.toString());
        console.log(data.toString());
        console.log("hi ;-;");

        // previous computation of curve samples
        //const samples = bezierCurve.sample(stepSize);

        // now we're trying to get them from a java server
        samples = JSON.parse(data.toString());
        //sampler.close();



        // get ui layers from the dom
        imgLayer = uiLayerGetter.getCleanUiLayer(hitSlider);
        canvasLayer = uiLayerGetter.getCleanCanvasLayer(hitSlider);

        // get context stuff from the canvas
        const borderContextBundle = canvasContextBundleCreator.createContextBundleOn(canvasLayer);
        const bodyContextBundle = canvasContextBundleCreator.createContextBundleOn(canvasLayer);

        // draw the border
        drawBezierComponent(samples, stepSize, borderContextBundle[0], borderContextBundle[1], BORDER_COLOR, 'source-over', 120, drawBodySegment, drawCircle);
        // erase the center of the border
        drawBezierComponent(samples, stepSize, borderContextBundle[0], borderContextBundle[1], BORDER_COLOR, 'destination-out', 105, drawBodySegment, drawCircle);
        // draw the gradient on the body
        drawBezierComponent(samples, stepSize, bodyContextBundle[0], bodyContextBundle[1], UNUSED, 'lighten', 105, drawBodySegmentGradient, drawCircleGradient);
        bodyContextBundle[2].style.opacity = 0.2;
        
        // head circle
        addImageToUiLayer(skinData.skinDict['hitcircle'], bezierCurve.compute(0), imgLayer);
        addImageToUiLayer(skinData.skinDict['hitcircleoverlay'], bezierCurve.compute(0), imgLayer);
    });
    var x2 = Date.now();
}

function drawBezierComponent(bezierCurve, stepSize, context, canvasRect, color, compositeOperation, width, segmentDrawingFunction, circleDrawingFunction) {
    context.globalCompositeOperation = compositeOperation;
    context.fillStyle = color;
    context.strokeStyle = color;
    context.lineWidth = width;

    const offset = new Vector2(canvasRect.left, canvasRect.top);
    const start = bezierCurve[0].plus(offset);
    const stop = bezierCurve[bezierCurve.length-1].plus(offset);

    var currentTangent = stop.minus(start);

    const centerOfCirclesToDraw = [start, stop];

    context.beginPath();
    context.moveTo(start.x, start.y);
    for(var i = 1; i < bezierCurve.length-1; i++) {
        const previousDerivative = bezierCurve[i].minus(bezierCurve[i-1]);
        const currentDerivative = bezierCurve[i+1].minus(bezierCurve[i]);
        currentTangent = currentDerivative;
        segmentDrawingFunction(context, bezierCurve[i-1].plus(offset), bezierCurve[i].plus(offset), bezierCurve[i+1].plus(offset), currentDerivative, width);
        const stepAngle = currentDerivative.angleFrom(previousDerivative);
        if(Math.abs(stepAngle) > MAX_ALLOWED_STEP_ANGLE) {
            centerOfCirclesToDraw.push(bezierCurve[i].plus(offset));
            context.moveTo(bezierCurve[i].plus(offset).x, bezierCurve[i].plus(offset).y);
        }
    }

    // complete the path
    if(bezierCurve.length < 2) {
        segmentDrawingFunction(context, start, stop, stop, currentTangent, width);
    }
    context.stroke();

    for(const center of centerOfCirclesToDraw) {
        circleDrawingFunction(context, center, width/2);
    }
}

function drawBodySegment(context, previousPosition, position, nextPosition, velocity, width) {
    /*context.lineJoin = 'round';
    context.lineTo(position.x, position.y);*/
    
    context.beginPath();
    context.moveTo(previousPosition.x, previousPosition.y);
    context.lineTo(position.x, position.y);
    context.lineTo(nextPosition.x, nextPosition.y);
    context.lineJoin = 'round';
    context.stroke();
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
    if(center.isFinite()) {
        const gradient = context.createRadialGradient(center.x, center.y, 0, center.x, center.y, radii);
        gradient.addColorStop(0, SLIDER_BODY_MAIN_GRADIENT_COLOR);
        gradient.addColorStop(1, SLIDER_BODY_SECONDARY_GRADIENT_COLOR);
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(center.x, center.y, radii, 0, 2*Math.PI);
        context.fill();
    }
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