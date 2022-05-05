<template>
  <div id="play-field-area">
  </div>
</template>

<script>
export default {
    name: "PlayfieldArea",
    components: {
    }
}
</script>

<style>
#play-field-area {
    height: 80%;
    aspect-ratio: 4/3;
    position: absolute;
    top:51.71%;
    left:50%;
    transform:translate(-50%,-50%);
    border-radius: 8px;
    background-color: rgba(64, 64, 64, 0.2);
}
</style>