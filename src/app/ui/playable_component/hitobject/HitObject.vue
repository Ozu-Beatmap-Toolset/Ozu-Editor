<template>
    <div class="hitobject-canvas-layer" >
        <canvas :id="this.getCanvasId()" :width="this.window.innerWidth" :height="this.window.innerHeight" style="position:absolute"/>
        <canvas :id="this.getOpacityCanvasId()" :width="this.window.innerWidth" :height="this.window.innerHeight" style="position:absolute; opacity: 0.8" />
    </div>
    <div class="hitobject-image-layer" :style="this.getComputedHeadPositionStyle()">
        <img class="hitobject-head" :src="getHitcircle()" />
        <img class="hitobject-head" :src="getHitcircleOverlay()" />
    </div>
</template>

<script>
import { appData } from '../../../../util/globals/GlobalData.js';
import SliderBodyDrawer from './SliderBodyDrawer.js'
import { findPositionOnSlider } from './sliderPositionFinder.js';

export default {
    name: "HitObject",
    props: ['dataObject'],
    data() {
        return {
            //canvasId: this.dataObject.id,
            canvasId: appData.uuid(),
            window: window,
            canvas: null,
            opacityCanvas: null,
            headPosition: this.dataObject.bezierCurves[0].controlPoints[0],
        };
    },
    methods: {
        getHitcircle() {
            return appData.skin.dict['hitcircle'];
        },
        getHitcircleOverlay() {
            return appData.skin.dict['hitcircleoverlay'];
        },
        getComputedHeadPositionStyle() {
            return { 
                left: `${this.headPosition.x}px`, 
                top: `${this.headPosition.y}px`,
            }
        },
        computeHeadPosition() {
            if(this.dataObject.bezierCurves.length === 1 && this.dataObject.bezierCurves[0].controlPoints.length === 1) {
                this.headPosition = this.dataObject.bezierCurves[0].controlPoints[0];
                return;
            }
            //return findPositionOnSlider(this.dataObject.bezierCurves, this.dataObject.distance);
            //return this.dataObject.bezierCurves[0].controlPoints[0];
            this.headPosition = findPositionOnSlider(this.dataObject.bezierCurves, 0);
        },
        getCanvasId() {
            return this.canvasId;
        },
        getOpacityCanvasId() {
            return this.canvasId + '-opacity-layer';
        },
        drawSliderBody(canvas, context, opacityCanvas, opacityContext, bCurves) {
            const samples = [];
            for(const bCurve of bCurves) {
                for(const sample of bCurve.samples) {
                    samples.push(sample);
                }
            }

            if(samples.length > 1) {
                const sliderBodyDrawer = new SliderBodyDrawer(canvas, context, opacityCanvas, opacityContext);
                //sliderBodyDrawer.draw(samples, appData.playfield.difficulty.circleSize);
                sliderBodyDrawer.draw(samples, 120);
            }
        }
    },
    mounted() {
        this.computeHeadPosition();
        this.canvas = document.getElementById(this.canvasId);
        const canvasContext = this.canvas.getContext('2d');
        this.opacityCanvas = document.getElementById(this.getOpacityCanvasId());
        const opacityCanvasContext = this.opacityCanvas.getContext('2d');
        this.drawSliderBody(this.canvas, canvasContext, this.opacityCanvas, opacityCanvasContext, this.dataObject.bezierCurves);
    }
}
</script>

<style>
.hitobject-canvas-layer {
  display: flex;
  justify-content: start;
  align-items: start;
}
.hitobject-head {
    position: absolute;
    left: inherit;
    top: inherit;
    transform: translate(-50%, -50%);
}
</style>