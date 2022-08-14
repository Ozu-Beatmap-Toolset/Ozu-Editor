<template>
    <div :style="this.getComputedHeadStyle()">
        <img class="hitobject-head" :src="this.hitCircleSrc" :style="{opacity:this.opacity}"/>
        <img class="hitobject-head" :src="this.hitCircleOverlaySrc" :style="{opacity:this.opacity}"/>
    </div>
</template>

<script>
    import { findPositionOnSlider } from '@/../src/app/ui/playable_component/hitobject/head/sliderPositionFinder.js';

    export default {
        name: "HitObjectHead",
        props: [
            "samples",
            "headDiameter",
            "headDistance",
            "hitCircleSrc",
            "hitCircleOverlaySrc",
            "opacity",
        ],
        data() {
            return {
                headPosition: null,
            };
        },
        methods: {
            computeHeadPosition() {
                this.headPosition = findPositionOnSlider(this.samples, this.headDistance);
            },
            getComputedHeadStyle() {
                const circleDiameter = Math.round(this.headDiameter * (128 / 118));
                return {
                    left: `${this.headPosition.x}px`,
                    top: `${this.headPosition.y}px`,
                    width: `${circleDiameter}px`,
                    height: `${circleDiameter}px`,
                };
            },
        },
        mounted() {
            this.computeHeadPosition();
        },
        beforeMount() {
            this.computeHeadPosition();
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
        -webkit-user-drag: none;
    }
</style>