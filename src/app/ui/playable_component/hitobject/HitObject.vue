<template>
    <div :style="{position:'absolute'}">
        <div class="hitobject-canvas-layer" position="absolute">
            <canvas :id="this.canvasId" 
                :width="this.boundingBox.width" 
                :height="this.boundingBox.height" 
                :style="this.getComputedCanvasStyle(1)" 
            />
            <canvas :id="this.getOpacityCanvasId()" 
                :width="this.boundingBox.width" 
                :height="this.boundingBox.height" 
                :style="this.getComputedCanvasStyle(0.8)" 
            />
        </div>
        <div class="hitobject-image-layer" :style="this.getComputedHeadStyle()">
            <img class="hitobject-head" :src="this.hitcircle" :style="{opacity:this.opacity}" />
            <img class="hitobject-head" :src="this.hitcircleoverlay" :style="{opacity:this.opacity}" />
        </div>
    </div>
</template>

<script>
import { uuid } from '@/../src/util/uuid/uuid.js'
import { drawCanvasSliderBody } from '@/../src/app/ui/playable_component/hitobject/sliderBodyDrawer.js'
import { findPositionOnSlider } from '@/../src/app/ui/playable_component/hitobject/sliderPositionFinder.js';
import { findBoundingBoxFromSamples } from '@/../src/app/ui/playable_component/hitobject/sliderBoundingBoxFinder.js'

export default {
    name: "HitObject",
    props: [
        'samples', 
        'headDiameter', 
        'headDistance', 
        'hitcircle', 'hitcircleoverlay', 
        'sliderBorderColour',
        'opacity', 
    ],
    data() {
        return {
            canvasId: uuid(),
            headPosition: null,
            boundingBox: null,
            canvas: null,
            opacityCanvas: null,
        };
    },
    methods: {
        computeHeadPosition() {
            this.headPosition = findPositionOnSlider(this.samples, this.headDistance);
        },
        computeCanvasBoundingBox() {
            this.boundingBox = findBoundingBoxFromSamples(this.samples, this.headDiameter/2);
        },
        getOpacityCanvasId() {
            return this.canvasId + '-opacity-layer';
        },
        getComputedHeadStyle() {
            const circleDiameter = Math.round(this.headDiameter * (128/118));
            return { 
                left: `${this.headPosition.x}px`, 
                top: `${this.headPosition.y}px`,
                width: `${circleDiameter}px`,
                height: `${circleDiameter}px`,
            }
        },
        getComputedCanvasStyle(opacityScale) {
            return {
                position: 'absolute',
                left: `${this.boundingBox.left}px`,
                top: `${this.boundingBox.top}px`,
                opacity: opacityScale*this.opacity,
            };
        },
        drawComponent() {
            this.canvas = document.getElementById(this.canvasId);
            const canvasContext = this.canvas.getContext('2d');
            this.opacityCanvas = document.getElementById(this.getOpacityCanvasId());
            const opacityCanvasContext = this.opacityCanvas.getContext('2d');
            this.drawSliderBody(this.canvas, canvasContext, this.opacityCanvas, opacityCanvasContext);
        },
        drawSliderBody(canvas, context, opacityCanvas, opacityContext) {
            const offsetSamples = [];
            for(const sample of this.samples) {
                offsetSamples.push(sample.minus({x: this.boundingBox.left, y: this.boundingBox.top}));
            } 

            if(this.samples.length > 1) {
                drawCanvasSliderBody(
                    offsetSamples, 
                    this.headDiameter, 
                    this.sliderBorderColour, 
                    canvas, context, 
                    opacityCanvas, opacityContext);
            }
        },
    },
    mounted() {
        this.computeHeadPosition();
        this.computeCanvasBoundingBox();
        this.drawComponent();
    },
    beforeMount() {
        this.computeHeadPosition();
        this.computeCanvasBoundingBox();
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