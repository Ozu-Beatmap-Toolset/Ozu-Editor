<template>
    <div class="time-division-line" 
        :style="{
            left:`${this.position}`, 
            height:`${this.height}`, 
            backgroundColor:`${this.strokeColor}` 
        }"
    />
</template>

<script>
export default {
    name: 'TimeDivisionLine',
    props: ['position', 'strokeColor', 'height'],
    data() {
        return {

        };
    },
}
</script>

<style>
    .time-division-line {
        position: absolute;
        width: 0.5px;
    }
</style>