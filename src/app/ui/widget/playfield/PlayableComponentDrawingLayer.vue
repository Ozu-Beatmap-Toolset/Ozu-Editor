<template>
    <div v-for="hitObject in this.hitObjects" :key="hitObject.id">
        <div v-if="hitObject.opacity > 0.01">
            <HitObject 
                :samples="this.getSamples(hitObject.bezierCurves)" 
                :controlPoints="this.getControlPoints(hitObject.bezierCurves)" 
                :headDiameter="hitObject.headDiameter"  
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

    export default {
        name: 'HitObjectDrawingLayer',
        components: {
            HitObject,
        },
        props: ['hitObjects', 'editionMode'],
        data() {
            return {
                skin: skin,
            };
        },
        methods: {
            getSamples(bezierCurves) {
                const samples = [];
                for(const bezierCurve of bezierCurves) {
                    for(const sample of bezierCurve.samples) {
                        samples.push(sample);
                    }
                }
                return samples;
            },
            getControlPoints(bezierCurves) {
                const controlPoints = [];
                for(const bezierCurve of bezierCurves) {
                    for(const controlPoint of bezierCurve.controlPoints) {
                        controlPoints.push(controlPoint);
                    }
                }
                return controlPoints;
            },
            getSliderBorderColour() {
                return getSliderBorderColour()
            },
        },
        created() {
            window.setInterval(() => {
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
        }
    }
</script>

<style>

</style>