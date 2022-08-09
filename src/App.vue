<template>
    <div class="app-background"/>
    <div class="widget-playfield-test">
        <PlayfieldArea 
            :hitObjects="this.hitObjects" 
            backgroundImageSrc="C:/Users/Plads/Documents/GitHub/Ozu-Beatmap-Toolset/editor/ozu-editor/assets/bg_test/sakura.jpeg" 
        />
    </div>
</template>

<script>
    import PlayfieldArea from '@/../src/app/ui/widget/playfield/PlayfieldArea.vue';

    export default {
        name: 'App',
        components: {
            PlayfieldArea,
        },
        data() {
            return {
                hitObjects: [],
            };
        }
    }
</script>

<style>
    body {
        overflow: hidden;
        user-select: none;
    }
    .app-background {
        height: 100%;
        width: 100%;
        position: absolute;
        background-color: #333;
    }
    .widget-playfield-test {
        position: absolute;
        overflow: hidden;
        top: 5%;
        left: 10%;
        height: 90%;
        width: 80%;
        border-radius: 6px;
        background-color: #222;
    }
</style>
