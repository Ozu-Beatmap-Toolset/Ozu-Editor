<template>
    <div class="slicle-canvas-layer"/>
    <div class="slicle-image-layer"/>
</template>

<script>
export default {
    name: "HitSlicle",
    data() {
        return {
            controlPoints: [],
            length: 0,          // the length of the curve, in osu pixels
            slicleVelocity: 1,  // osu pixels / second
            currentHeadPosition: 0, // value of t
        };
    }
}
</script>

<style>

</style>