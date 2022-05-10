<template>
    <div class="left-border-menu">
        <QuickAccessButton/>
    </div>
</template>

<script>
import QuickAccessButton from './tool_button/QuickAccessToolButton.vue'

export default {
    name: "LeftBorderMenu",
    components: {
        QuickAccessButton
    }
}
</script>

<style>
.left-border-menu {
    position: absolute;
    height: 100%;
    width:46px;
    top:0px;
    left:0px;

    border-color: rgb(0, 0, 0, 0) rgb(99, 99, 99) rgb(0, 0, 0, 0) rgb(0, 0, 0, 0);
}
</style>