<template>
    <TopMB class="measure-bar"/>
    <BottomMB class="measure-bar"/>
</template>

<script>
import TopMB from './TopMeasureBar.vue';
import BottomMB from './BottomMeasureBar.vue';
export default {
    name: 'MeasureBars',
    components: {
      TopMB,
      BottomMB
    }
}
</script>

<style>
.measure-bar {
    background-color: rgba(75, 75, 75, 0.95);

    border-style: solid;
    border-width: 1px;
}
</style>