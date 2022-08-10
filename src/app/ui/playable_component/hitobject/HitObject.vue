<template style="position:absolute">
    <SliderBody 
        :samples="this.samples"
        :headDiameter="this.headDiameter"
        :sliderBorderColour="this.sliderBorderColour"
        :opacity="this.opacity"
    />
    <HitObjectHead 
        :samples="this.samples" 
        :headDiameter="this.headDiameter"
        :headDistance="this.headDistance" 
        :hitCircleSrc="this.hitCircleSrc" 
        :hitCircleOverlaySrc="this.hitCircleOverlaySrc" 
        :opacity="this.opacity" 
        :key="this.headDistance" 
    />
    <ControlPoints v-if="this.editionMode === this.EditionMode.edit"
        :controlPoints="this.controlPoints" 
        :selectedIndexes="[]" 
        :key="this.editionMode" 
    />
</template>

<script>
    import SliderBody from '@/../src/app/ui/playable_component/hitobject/SliderBody.vue';
    import HitObjectHead from '@/../src/app/ui/playable_component/hitobject/HitObjectHead.vue';
    import ControlPoints from '@/../src/app/ui/playable_component/hitobject/ControlPoints.vue';
    import { EditionMode } from '@/../src/app/ui/widget/playfield/EditionModeEnum.js';

    export default {
        name: "HitObject",
        components: {
            SliderBody,
            HitObjectHead,
            ControlPoints
        },
        props: [
            "controlPoints",
            "samples",
            "headDiameter",
            "headDistance",
            "hitCircleSrc",
            "hitCircleOverlaySrc",
            "sliderBorderColour",
            "opacity",
            "editionMode",
        ],
        data() {
            return {
                EditionMode: EditionMode,
            };
        },
    }
</script>

<style>
    .hitobject-head {
        position: absolute;
        width: inherit;
        height: inherit;
        left: inherit;
        top: inherit;
        transform: translate(-50%, -50%);
    }
</style>