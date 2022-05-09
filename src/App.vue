<template>
  <div id="app-background">
      <img id="sakura-test" src="../assets/bg_test/sakura.jpeg"/>
  </div>
  <PlayfieldArea/>
  <MeasureBars/>
  <BorderMenus/>
</template>

<script>
import PlayfieldArea from './app/ui/playfield/PlayfieldArea.vue'
import BorderMenus from './app/ui/menus/border_menu/BorderMenu.vue'
import MeasureBars from './app/ui/menus/measure_bar/MeasureBar.vue'

export default {
    name: 'App',
    components: {
      PlayfieldArea,
      BorderMenus,
      MeasureBars
    },
    data() {
        return {

        };
    }
}
</script>

<style>
body {
    overflow: hidden;
    user-select: none;
}

#sakura-test {
    width:100%;
    height: auto;
    display: block;
    margin-left: auto;
    margin-right: auto;
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
