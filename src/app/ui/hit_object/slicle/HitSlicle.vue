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
            length: 0,              // the length of the curve, in osu pixels
            duration: 0,            // the duration of the curve, in beats
            additionalCycles: 0,    // amount of times the slider goes back on itself
            slicleVelocity: 1,      // osu pixels / second
            parametricPosition: 0,  // value of t
        };
    }
}
</script>

<style>

</style>