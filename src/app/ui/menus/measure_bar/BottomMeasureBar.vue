<template>
    <div class="bottom-measure-bar"/>
</template>

<script>
export default {
    name: "BottomMeasureBar"
}
</script>

<style>
.bottom-measure-bar {
    position: absolute;
    height:7%;
    width:calc(100% - 6px - 46px - 18%);
    top:93%;
    left:48px;

    border-color: rgb(99, 99, 99) rgb(0, 0, 0, 0) rgb(0, 0, 0, 0) rgb(0, 0, 0, 0);
}
</style>