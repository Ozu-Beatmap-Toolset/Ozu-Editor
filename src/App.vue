<template>
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
body {
    height: 100%;
    overflow: hidden;
    background-color: #333;
    user-select: none;
}
</style>
