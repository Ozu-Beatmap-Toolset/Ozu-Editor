<template>
    <div class="hitobject-head-image-container" :style="this.getComputedHeadStyle()" ref="images">
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
                if(this.headPosition === null) {
                    return {
                        width: `${circleDiameter}px`,
                        height: `${circleDiameter}px`,
                    }
                }
                return {
                    width: `${circleDiameter}px`,
                    height: `${circleDiameter}px`,
                    transform: `translate(${this.headPosition.x}px, ${this.headPosition.y}px)`,
                };
            },
        },
        mounted() {
            this.computeHeadPosition();
            //window.requestAnimationFrame(() => { this.$refs['images'].style.transform = `translate(${this.headPosition.x}px, ${this.headPosition.y}px)`; });
        },
        beforeUpdate() {
            this.computeHeadPosition();
            //window.requestAnimationFrame(() => { this.$refs['images'].style.transform = `translate(${this.headPosition.x}px, ${this.headPosition.y}px)`; });
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
    .hitobject-head-image-container {
        left: 0px;
        top: 0px;
    }
</style>