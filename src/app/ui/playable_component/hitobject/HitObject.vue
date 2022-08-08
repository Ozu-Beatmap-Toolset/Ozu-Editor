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
</template>

<script>
    import SliderBody from '@/../src/app/ui/playable_component/hitobject/SliderBody.vue';
    import HitObjectHead from '@/../src/app/ui/playable_component/hitobject/HitObjectHead.vue';

    export default {
        name: "HitObject",
        components: { 
            SliderBody,
            HitObjectHead
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
        ],
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