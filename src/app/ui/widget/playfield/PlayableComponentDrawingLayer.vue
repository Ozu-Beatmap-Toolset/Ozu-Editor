<template>
    <div v-for="hitObject in this.hitObjects" :key="hitObject.id">
        <div v-if="hitObject.opacity > 0.01">
            <HitObject 
                :samples="this.getSamples(hitObject.bezierCurves)" 
                :controlPoints="this.getControlPoints(hitObject.bezierCurves)" 
                :headDiameter="this.getHeadDiameter()" 
                :headDistance="hitObject.headDistance" 
                :hitCircleSrc="this.skin.dict['hitcircle']" 
                :hitCircleOverlaySrc="this.skin.dict['hitcircleoverlay']" 
                :sliderBorderColour="this.getSliderBorderColour()" 
                :opacity="hitObject.opacity" 
                :editionMode="this.editionMode"
            />
        </div>
    </div>
</template>

<script>
    import HitObject from '@/../src/app/ui/playable_component/hitobject/HitObject.vue';
    import { skin } from '@/../src/app/game_data/skin/skinData.js';
    import { getSliderBorderColour } from '@/../src/app/game_data/skin/sliderBorderColour.js';
    import { circleSizeToRadiusInOsuPixels } from '@/../src/app/game_data/difficulty/circleSizeConverter.js';
    import { playfieldResolution } from '@/../src/app/game_data/playfield/resolution.js';
    import Vector2 from '@/../src/util/math/vector/Vector2.js';

    export default {
        name: 'HitObjectDrawingLayer',
        components: {
            HitObject,
        },
        props: ['hitObjects', 'playfieldClientRect', 'widgetClientRect', 'editionMode', 'circleSize'],
        data() {
            return {
                skin: skin,
                samples: null,
                tempHeadUpdateInterval: null,
            };
        },
        methods: {
            osuCoordinatesToClientPlayfield(osuPosition) {
                const scalingFactor = this.playfieldClientRect.height / playfieldResolution.height;
                return new Vector2(
                    osuPosition.x*scalingFactor + this.playfieldClientRect.left - this.widgetClientRect.left,
                    osuPosition.y*scalingFactor + this.playfieldClientRect.top - this.widgetClientRect.top);
            },
            getSamples(bezierCurves) {
                const samples = [];
                for(const bezierCurve of bezierCurves) {
                    for(const sample of bezierCurve.samples) {
                        const transformed = this.osuCoordinatesToClientPlayfield(sample);
                        samples.push(transformed);
                    }
                }
                return samples;
            },
            getHeadDiameter() {
                const diameterInOsuSize = 2 * circleSizeToRadiusInOsuPixels(this.circleSize);
                const scalingFactor = this.playfieldClientRect.height / playfieldResolution.height;
                return diameterInOsuSize * scalingFactor;
            },
            getControlPoints(bezierCurves) {
                const controlPoints = [];
                for(const bezierCurve of bezierCurves) {
                    for(const controlPoint of bezierCurve.controlPoints) {
                        const transformed = this.osuCoordinatesToClientPlayfield(controlPoint);
                        controlPoints.push(transformed);
                    }
                }
                return controlPoints;
            },
            getSliderBorderColour() {
                return getSliderBorderColour()
            },
        },
        beforeUnmount() {
            window.clearInterval(this.tempHeadUpdateInterval);
        }
    }
</script>

<style>

</style>