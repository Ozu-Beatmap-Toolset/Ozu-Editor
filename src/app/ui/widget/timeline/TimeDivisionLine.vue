<template>
    <div class="time-division-line" :style="{left:`${this.position}px`, height:`${this.height}`, backgroundColor:`${this.strokeColor}`}"/>
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
        position: relative;
        width: 1px;
    }
</style>