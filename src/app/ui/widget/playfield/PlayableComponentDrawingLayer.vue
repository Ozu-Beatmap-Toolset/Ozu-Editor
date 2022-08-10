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
                const offset1 = new Vector2(this.playfieldClientRect.left, this.playfieldClientRect.top);
                const offset2 = new Vector2(this.widgetClientRect.left, this.widgetClientRect.top);
                return osuPosition.scaled(scalingFactor).plus(offset1).minus(offset2);
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
        beforeMount() {
            this.tempHeadUpdateInterval = window.setInterval(() => {
                for(const hitObject of this.hitObjects) {
                    hitObject.headDistance += 10;
                    var totalLength = 0;
                    const samples = this.getSamples(hitObject.bezierCurves);
                    for(var i = 1; i < samples.length; i++) {
                        totalLength += samples[i-1].distance(samples[i]);
                    }
                    if(hitObject.headDistance > totalLength) {
                        if(totalLength > 0) {
                            hitObject.headDistance %= totalLength;
                        }
                        else {
                            hitObject.headDistance = 0;
                        }
                    }
                }
            }, 16);
        },
        mounted() {

        },
        beforeUnmount() {
            window.clearInterval(this.tempHeadUpdateInterval);
        }
    }
</script>

<style>

</style>