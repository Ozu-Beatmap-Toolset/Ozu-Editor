<template>
    <div class="widget-content" ref="widget">
        <slot>
            <img class="background-logo" src="@/../assets/logo/icon-v5.png"/>
        </slot>
    </div>
</template>

<script>
export default {
    name: 'BaseWidget',
    methods: {
        getWidgetClientRect() {
            return {
                left: this.$refs['widget'].offsetLeft,
                top: this.$refs['widget'].offsetTop,
                width: this.$refs['widget'].offsetWidth,
                height: this.$refs['widget'].offsetHeight,
            }
        }
    }
}
</script>

<style>
    .widget-content {
        position: absolute;
        overflow: hidden;
        top: 5%;
        left: 10%;
        height: 90%;
        width: 80%;
        border-radius: 6px;
        background-color: #2A2A2A;
        resize: both;
    }
</style>