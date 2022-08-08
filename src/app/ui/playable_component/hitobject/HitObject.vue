<template>
    <div class="hitobject-canvas-layer" :style="this.getComputedBodyStyle()" >
        <canvas :id="this.canvasId" :width="this.window.innerWidth" :height="this.window.innerHeight" :style="{position:'absolute', left:this.playfieldOffset.x+'px', top:this.playfieldOffset.y+'px', opacity:this.opacity}"/>
        <canvas :id="this.getOpacityCanvasId()" :width="this.window.innerWidth" :height="this.window.innerHeight" :style="{position:'absolute', left:this.playfieldOffset.x+'px', top:this.playfieldOffset.y+'px', opacity: 0.8*this.opacity}" />
    </div>
    <div class="hitobject-image-layer" :style="this.getComputedHeadStyle()">
        <img class="hitobject-head" :src="this.hitcircle" :style="{opacity:this.opacity}" />
        <img class="hitobject-head" :src="this.hitcircleoverlay" :style="{opacity:this.opacity}" />
    </div>
</template>

<script>
import { uuid } from '@/../src/util/uuid/uuid.js'
import { drawCanvasSliderBody } from './sliderBodyDrawer.js'
import { findPositionOnSlider } from './sliderPositionFinder.js';
import { circleSizeToRadiusInOsuPixels } from './circleSizeConverter';

export default {
    name: "HitObject",
    props: ['playfieldOffset', 'playfieldScale', 'opacity', 'circleSize', 'samples', 'headDistance', 'hitcircle', 'hitcircleoverlay', 'sliderBorderColour'],
    data() {
        return {
            canvasId: uuid(),
            window: window,
            canvas: null,
            opacityCanvas: null,
        };
    },
    methods: {
        getComputedHeadStyle() {
            const circleDiameter = Math.round(this.getHeadRadiusInScreenPixels() * (128/118));
            return { 
                left: `${this.headPosition.x + this.playfieldOffset.x}px`, 
                top: `${this.headPosition.y + this.playfieldOffset.y}px`,
                width: `${circleDiameter}px`,
                height: `${circleDiameter}px`,
                zoom: `${1/this.playfieldScale}`
            }
        },
        getComputedBodyStyle() {
            return {
                zoom: `${1/this.playfieldScale}`
            }
        },
        getHeadRadiusInScreenPixels() {
            const osuPixels = circleSizeToRadiusInOsuPixels(this.circleSize);
            return osuPixels / this.playfieldScale;
        },
        getBodyRadiusInScreenPixels() {
            const osuPixels = circleSizeToRadiusInOsuPixels(this.circleSize);
            return osuPixels / this.playfieldScale;
        },
        computeHeadPosition() {
            if(this.samples.length === 1) {
                this.headPosition = this.samples[0];
            }
            else {
                this.headPosition = findPositionOnSlider(this.samples, this.headDistance);
            }
        },
        getOpacityCanvasId() {
            return this.canvasId + '-opacity-layer';
        },
        drawSliderBody(canvas, context, opacityCanvas, opacityContext) {
            if(this.samples.length > 1) {
                drawCanvasSliderBody(
                    this.samples, 
                    this.getBodyRadiusInScreenPixels(), 
                    this.sliderBorderColour, 
                    canvas, context, 
                    opacityCanvas, opacityContext);
            }
        },
        drawComponent() {
            this.canvas = document.getElementById(this.canvasId);
            const canvasContext = this.canvas.getContext('2d');
            this.opacityCanvas = document.getElementById(this.getOpacityCanvasId());
            const opacityCanvasContext = this.opacityCanvas.getContext('2d');
            this.drawSliderBody(this.canvas, canvasContext, this.opacityCanvas, opacityCanvasContext);
        }
    },
    mounted() {
        this.computeHeadPosition();
        this.drawComponent();
    },
    beforeMount() {
        this.computeHeadPosition();
    }
}
</script>

<style>
.hitobject-canvas-layer {
  position: absolute;
  top: 0px;
  left: 0px;
}
.hitobject-head {
    position: absolute;
    width: inherit;
    height: inherit;
    left: inherit;
    top: inherit;
    transform: translate(-50%, -50%);
}
</style>