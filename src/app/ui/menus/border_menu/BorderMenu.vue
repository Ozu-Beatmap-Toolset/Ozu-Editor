<template>
    <LeftBM class="border-menu"/>
    <RightBM class="border-menu"/>
</template>

<script>
import LeftBM from '@/../src/app/ui/menus/border_menu/LeftBorderMenu.vue'
import RightBM from '@/../src/app/ui/menus/border_menu/RightBorderMenu.vue'
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
    background-color: rgba(75, 75, 75);
    
    border-style: solid;
    border-width: 1px;
}
</style>