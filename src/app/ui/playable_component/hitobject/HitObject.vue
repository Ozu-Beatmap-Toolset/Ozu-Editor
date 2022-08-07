<template>
    <div class="hitobject-canvas-layer" :style="this.getComputedBodyStyle()" >
        <canvas :id="this.getCanvasId()" :width="this.window.innerWidth" :height="this.window.innerHeight" :style="{position:'absolute', left:this.dataObject.playfieldOffset.x+'px', top:this.dataObject.playfieldOffset.y+'px', opacity:this.dataObject.opacity}"/>
        <canvas :id="this.getOpacityCanvasId()" :width="this.window.innerWidth" :height="this.window.innerHeight" :style="{position:'absolute', left:this.dataObject.playfieldOffset.x+'px', top:this.dataObject.playfieldOffset.y+'px', opacity: 0.9*this.dataObject.opacity}" />
    </div>
    <div class="hitobject-image-layer" :style="this.getComputedHeadStyle()">
        <img class="hitobject-head" :src="getHitcircle()" :style="{opacity:this.dataObject.opacity}" />
        <img class="hitobject-head" :src="getHitcircleOverlay()" :style="{opacity:this.dataObject.opacity}" />
    </div>
</template>

<script>
import { appData } from '../../../../util/globals/GlobalData.js';
import { uuid } from '../../../../util/uuid/uuid.js'
import SliderBodyDrawer from './SliderBodyDrawer.js'
import { findPositionOnSlider } from './sliderPositionFinder.js';
import { circleSizeToRadiusInOsuPixels } from './circleSizeConverter';

export default {
    name: "HitObject",
    props: ['dataObject'],
    data() {
        return {
            canvasId: uuid(),
            window: window,
            canvas: null,
            opacityCanvas: null,
            headPosition: null,
        };
    },
    methods: {
        getHitcircle() {
            return appData.skin.dict['hitcircle'];
        },
        getHitcircleOverlay() {
            return appData.skin.dict['hitcircleoverlay'];
        },
        getComputedHeadStyle() {
            const circleDiameter = Math.round(this.getHitRadiusInScreenPixels() * (128/118));
            return { 
                left: `${this.headPosition.x + this.dataObject.playfieldOffset.x}px`, 
                top: `${this.headPosition.y + this.dataObject.playfieldOffset.y}px`,
                width: `${circleDiameter}px`,
                height: `${circleDiameter}px`,
                zoom: `${1/this.dataObject.playfieldScale}`
            }
        },
        getComputedBodyStyle() {
            return {
                zoom: `${1/this.dataObject.playfieldScale}`
            }
        },
        getHitRadiusInScreenPixels() {
            const osuPixels = circleSizeToRadiusInOsuPixels(this.dataObject.difficulty.circleSize);
            return osuPixels / this.dataObject.playfieldScale;
        },
        computeHeadPosition() {
            if(this.dataObject.bezierCurves.length === 1 && this.dataObject.bezierCurves[0].controlPoints.length === 1) {
                this.headPosition = this.dataObject.bezierCurves[0].controlPoints[0];
            }
            else {
                this.headPosition = findPositionOnSlider(this.dataObject.bezierCurves, this.dataObject.headDistance);
            }
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
                const enhancedSamples = bCurve.samples;
                for(const sample of enhancedSamples) {
                    samples.push(sample);
                }
            }

            if(samples.length > 1) {
                const sliderBodyDrawer = new SliderBodyDrawer(canvas, context, opacityCanvas, opacityContext);
                sliderBodyDrawer.draw(samples, this.getHitRadiusInScreenPixels());
            }
        },
        drawComponent() {
            this.canvas = document.getElementById(this.canvasId);
            const canvasContext = this.canvas.getContext('2d');
            this.opacityCanvas = document.getElementById(this.getOpacityCanvasId());
            const opacityCanvasContext = this.opacityCanvas.getContext('2d');
            this.drawSliderBody(this.canvas, canvasContext, this.opacityCanvas, opacityCanvasContext, this.dataObject.bezierCurves);
        }
    },
    mounted() {
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