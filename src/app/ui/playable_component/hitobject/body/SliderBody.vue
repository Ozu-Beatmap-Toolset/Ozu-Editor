<template class="hitobject-canvas-layer">
    <canvas ref="canvas" 
        :width="this.boundingBox.width" 
        :height="this.boundingBox.height" 
        :style="this.getComputedCanvasStyle(1)" 
    />
    <canvas ref="opacityCanvas" 
        :width="this.boundingBox.width" 
        :height="this.boundingBox.height" 
        :style="this.getComputedCanvasStyle(0.8)" 
    />
</template>

<script>
    import { drawCanvasSliderBody } from '@/../src/app/ui/playable_component/hitobject/body/sliderBodyDrawer.js'
    import { findBoundingBoxFromSamples } from '@/../src/app/ui/playable_component/hitobject/body/sliderBoundingBoxFinder.js'

    export default {
        name: "SliderBody",
        props: [
            "samples",
            "headDiameter",
            "sliderBorderColour",
            "opacity",
        ],
        data() {
            return {
                boundingBox: null,
            };
        },
        methods: {
            getComputedCanvasStyle(opacityScale) {
                return {
                    position: 'absolute',
                    left: `${this.boundingBox.left}px`,
                    top: `${this.boundingBox.top}px`,
                    opacity: opacityScale*this.opacity,
                };
            },
            computeCanvasBoundingBox() {
                this.boundingBox = findBoundingBoxFromSamples(this.samples, this.headDiameter/2);
            },
            drawComponent() {
                const canvas = this.$refs.canvas;
                const canvasContext = canvas.getContext('2d');
                const opacityCanvas = this.$refs.opacityCanvas;
                const opacityCanvasContext = opacityCanvas.getContext('2d');
                this.drawSliderBody(canvas, canvasContext, opacityCanvas, opacityCanvasContext);
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
        beforeMount() {
            this.computeCanvasBoundingBox();
        },
        mounted() {
            this.computeCanvasBoundingBox();
            this.drawComponent();
        }
    }
</script>

<style>
    .hitobject-canvas-layer {
        position: absolute;
        top: 0px;
        left: 0px;
    }
</style>