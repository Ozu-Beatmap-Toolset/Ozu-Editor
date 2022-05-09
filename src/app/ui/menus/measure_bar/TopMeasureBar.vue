<template>
    <div class="top-measure-bar"/>
</template>

<script>
export default {
    name: "TopMeasureBar"
}
</script>

<style>
.top-measure-bar {
    position: absolute;
    height:10%;
    width:calc(100% - 6px - 46px - 18%);
    top:0%;
    left:48px;

    border-color: rgb(0, 0, 0, 0) rgb(0, 0, 0, 0) rgb(99, 99, 99) rgb(0, 0, 0, 0);
}
</style>