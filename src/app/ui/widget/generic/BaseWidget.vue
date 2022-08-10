<template>
    <div class="widget-content">
        <slot>
            <img class="background-logo" src="@/../assets/logo/icon-v5.png"/>
        </slot>
    </div>
</template>

<script>
export default {
    name: 'BaseWidget',
}
</script>

<style>
    .widget-content {
        position: absolute;
        overflow: hidden;
        top: 0%;
        left: 0%;
        height: 90%;
        width: 80%;
        border-radius: 6px;
        background-color: #2A2A2A;
        resize: both;
    }
</style>