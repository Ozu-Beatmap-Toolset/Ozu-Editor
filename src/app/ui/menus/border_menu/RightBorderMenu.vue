<template>
    <div class="right-border-menu"/>
</template>

<script>
export default {
    name: "RightBorderMenu"
}
</script>

<style>
.right-border-menu {
    position: absolute;
    height: 100%;
    width:18%;
    top:0px;
    left:100%;
    transform:translate(-100%, 0%);

    border-color: rgb(0, 0, 0, 0) rgb(0, 0, 0, 0) rgb(0, 0, 0, 0) rgb(99, 99, 99);
}
</style>