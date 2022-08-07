<template>
    <!--draw the canvas layer only if this is a slider-->
    <div class="hitobject-canvas-layer" >
        <canvas :id="this.getCanvasId()" :width="this.window.innerWidth" :height="this.window.innerHeight" />
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
            canvasContext: null,
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
            var headPosition = this.getHeadPosition();
            return { 
                left: `${headPosition.x}px`, 
                top: `${headPosition.y}px`,
            }
        },
        getHeadPosition() {
            if(this.dataObject.bezierCurves.length === 1 && this.dataObject.bezierCurves[0].controlPoints.length === 1) {
                return this.dataObject.bezierCurves[0].controlPoints[0];
            }
            //return findPositionOnSlider(this.dataObject.bezierCurves, this.dataObject.distance);
            //return this.dataObject.bezierCurves[0].controlPoints[0];
            return findPositionOnSlider(this.dataObject.bezierCurves, 0);
        },
        getCanvasId() {
            return this.canvasId;
        },
        drawSliderBody(canvas, context, bCurves) {
            const samples = [];
            for(const bCurve of bCurves) {
                for(const sample of bCurve.samples) {
                    samples.push(sample);
                }
            }

            if(samples.length > 1) {
                const sliderBodyDrawer = new SliderBodyDrawer(canvas, context);
                //sliderBodyDrawer.draw(samples, appData.playfield.difficulty.circleSize);
                sliderBodyDrawer.draw(samples, 120);
            }
        }
    },
    mounted() {
        this.canvas = document.getElementById(this.canvasId);
        this.canvasContext = this.canvas.getContext('2d');
        this.drawSliderBody(this.canvas, this.canvasContext, this.dataObject.bezierCurves);
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