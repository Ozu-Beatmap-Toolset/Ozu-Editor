<template>
<div id="app-background"></div>
<PlayfieldArea></PlayfieldArea>
</template>

<script>
import PlayfieldArea from './app/playfield/PlayfieldArea.vue'
export default {
    name: 'App',
    components: {
      PlayfieldArea
    }
}
</script>


<style>
#app-background {
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-color: #333;
    user-select: none;
}
</style>
