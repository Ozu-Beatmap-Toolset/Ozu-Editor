<template>
    <div :style="this.getComputedHeadStyle()" ref="images">
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
                /*return {
                    left: `${this.headPosition.x}px`,
                    top: `${this.headPosition.y}px`,
                    width: `${circleDiameter}px`,
                    height: `${circleDiameter}px`,
                };*/
                if(this.headPosition === null) {
                    return {
                        left: '0px',
                        top: '0px',
                        width: `${circleDiameter}px`,
                        height: `${circleDiameter}px`,
                    }
                }
                return {
                    left: '0px',
                    top: '0px',
                    width: `${circleDiameter}px`,
                    height: `${circleDiameter}px`,
                    transform: `translate(${this.headPosition.x}px, ${this.headPosition.y}px)`,
                };
            },
        },
        mounted() {
            this.computeHeadPosition();
            window.requestAnimationFrame(() => { 
                this.$refs['images'].style.transform = `translate(${this.headPosition.x}px, ${this.headPosition.y}px)`; });
            
        },
        beforeUpdate() {
            this.computeHeadPosition();
            window.requestAnimationFrame(() => { 
                this.$refs['images'].style.transform = `translate(${this.headPosition.x}px, ${this.headPosition.y}px)`; });
            
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