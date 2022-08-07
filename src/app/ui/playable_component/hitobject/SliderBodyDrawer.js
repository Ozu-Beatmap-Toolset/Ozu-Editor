import { getSliderBorderColor } from "../../../game_data/skin/sliderBorderColour.js";

const INNER_BORDER_RATIO = 7/8.0;
const UNUSED_COLOR = '#000000';
const SLIDER_BODY_MAIN_GRADIENT_COLOR = 'rgba(128, 128, 128)';
const SLIDER_BODY_SECONDARY_GRADIENT_COLOR = 'rgba(0, 0, 0)'

export default class SliderBodyDrawer {
    context;
    canvas;
    opacityContext;
    opacityCanvas;

    constructor(canvas, context, opacityCanvas, opacityContext) {
        this.context = context;
        this.canvas = canvas;
        this.opacityCanvas = opacityCanvas;
        this.opacityContext = opacityContext;
    }

    draw(samples, strokeWidth) {
        const sliderBorderColor = getSliderBorderColor();
        const outerWidth = strokeWidth;
        const innerWidth = strokeWidth*INNER_BORDER_RATIO;

        this.eraseCanvas(this.canvas, this.context);
        this.eraseCanvas(this.opacityCanvas, this.opacityContext);
        this.drawBodyComponent(samples, this.context, sliderBorderColor, 'source-over', outerWidth, this.drawUniformSegment, this.drawUniformCircle);
        this.drawBodyComponent(samples, this.context, sliderBorderColor, 'destination-out', innerWidth, this.drawUniformSegment, this.drawUniformCircle);
        this.drawBodyComponent(samples, this.opacityContext, UNUSED_COLOR, 'lighten', innerWidth, this.drawGradientSegment, this.drawGradientCircle);
    }

    eraseCanvas(canvas, context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    drawBodyComponent(samples, context, color, compositeOperation, strokeWidth, segmentFunction, circleFunction) {
        context.globalCompositeOperation = compositeOperation;
        context.fillStyle = color;
        context.strokeStyle = color;
        context.lineWidth = strokeWidth;

        for(var i = 0; i < samples.length-1; i++) {
            segmentFunction(context, samples, i, strokeWidth);
            circleFunction(context, samples, i, strokeWidth);
        }
        circleFunction(context, samples, samples.length-1, strokeWidth);
    }

    drawUniformSegment(context, samples, i) {
        const p0 = samples[i];
        const p1 = samples[i+1];
        
        context.beginPath();
        context.moveTo(p0.x, p0.y);
        context.lineTo(p1.x, p1.y);
        context.lineJoin = 'round';
        context.stroke();
    }

    drawGradientSegment(context, samples, i, strokeWidth) {
        const p0 = samples[i];
        const p1 = samples[i+1];

        const piOver2 = Math.PI*0.5;
        const widthOver2 = strokeWidth*0.5;
        const parallelVector = p1.minus(p0);
        const perpendicularVector = parallelVector.rotate(piOver2).scaledToMagnitude(widthOver2);
        const gradPoint0 = p0.plus(perpendicularVector);
        const gradPoint1 = p0.minus(perpendicularVector);

        const gradient = context.createLinearGradient(gradPoint0.x, gradPoint0.y, gradPoint1.x, gradPoint1.y);
        gradient.addColorStop(0, SLIDER_BODY_SECONDARY_GRADIENT_COLOR);
        gradient.addColorStop(0.5, SLIDER_BODY_MAIN_GRADIENT_COLOR);
        gradient.addColorStop(1, SLIDER_BODY_SECONDARY_GRADIENT_COLOR);

        context.beginPath();
        context.moveTo(p0.x, p0.y);
        context.lineTo(p1.x, p1.y);
        context.strokeStyle = gradient;
        context.lineJoin = 'round';
        context.stroke();
    }

    drawUniformCircle(context, samples, i, strokeWidth) {
        const p = samples[i];
        const twoPi = Math.PI*2;
        const widthOver2 = strokeWidth/2;

        context.beginPath();
        context.arc(p.x, p.y, widthOver2, 0, twoPi);
        context.fill();
    }

    drawGradientCircle(context, samples, i, strokeWidth) {
        const p = samples[i];
        const twoPi = Math.PI*2;
        const widthOver2 = strokeWidth/2;

        const gradient = context.createRadialGradient(p.x, p.y, 0, p.x, p.y, widthOver2);
        gradient.addColorStop(0, SLIDER_BODY_MAIN_GRADIENT_COLOR);
        gradient.addColorStop(1, SLIDER_BODY_SECONDARY_GRADIENT_COLOR);
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(p.x, p.y, widthOver2, 0, twoPi);
        context.fill();
    }
}