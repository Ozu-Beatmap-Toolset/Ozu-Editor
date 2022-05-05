<template>
  <div id="app-background"/>
  <PlayfieldArea/>
</template>

<script>
import PlayfieldArea from './app/ui/playfield/PlayfieldArea.vue'
export default {
    name: 'App',
    components: {
      PlayfieldArea
    }
}
</script>


<style>
body {
    overflow: hidden;
}

#app-background {
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    position: absolute;
    background-color: #333;
}
</style>
