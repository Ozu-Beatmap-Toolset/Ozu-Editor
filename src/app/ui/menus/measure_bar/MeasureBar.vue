<template>
    <TopMB class="measure-bar"/>
    <BottomMB class="measure-bar"/>
</template>

<script>
import TopMB from '@/../src/app/ui/menus/measure_bar/TopMeasureBar.vue';
import BottomMB from '@/../src/app/ui/menus/measure_bar/BottomMeasureBar.vue';
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
    background-color: rgba(75, 75, 75);

    border-style: solid;
    border-width: 1px;
}
</style>