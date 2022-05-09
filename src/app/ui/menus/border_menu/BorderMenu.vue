<template>
    <LeftBM class="border-menu" @onSelectionToolClicked="$emit('onSelectionToolClicked')"/>
    <RightBM class="border-menu"/>
</template>

<script>
import LeftBM from './LeftBorderMenu.vue'
import RightBM from './RightBorderMenu.vue'
export default {
    name: 'BorderMenus',
    components: {
      LeftBM,
      RightBM
    }
}
</script>

<style>
.border-menu {
    background-color: rgba(75, 75, 75, 0.95);
    
    border-style: solid;
    border-width: 1px;
}
</style>