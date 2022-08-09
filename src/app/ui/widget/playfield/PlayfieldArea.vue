<template>
    <PlayfieldEventHandlingLayer :userTool="this.userTool">
        <img class="background-image" src="@/../assets/bg_test/sakura.jpeg"/>
        <div class="playfield-area"/>
        <PlayableComponentDrawingLayer :hitObjects="this.hitObjects" :editionMode="this.editionMode"/>
    </PlayfieldEventHandlingLayer>
</template>

<script>
    import { getNextPlayfieldTool } from '@/../src/app/ui/widget/playfield/playfieldToolSelector.js';
    import { EditionMode } from '@/../src/app/ui/widget/playfield/EditionModeEnum.js';
    import SelectTool from '@/../src/app/ui/widget/playfield/tools/SelectTool.js';
    import PlayfieldEventHandlingLayer from '@/../src/app/ui/widget/playfield/PlayfieldEventHandlingLayer.vue';
    import PlayableComponentDrawingLayer from '@/../src/app/ui/widget/playfield/PlayableComponentDrawingLayer.vue';

    export default {
        name: 'PlayfieldArea',
        components: {
            PlayfieldEventHandlingLayer,
            PlayableComponentDrawingLayer
        },
        props: [
            'hitObjects',
            'backgroundImageSrc',
        ],
        data() {
            return {
                editionMode: EditionMode.hitObject,
                userTool: new SelectTool(this.hitObjects),
            };
        },
        created() {
            this.events.on('set-active-tool', this.quickAccessToolChanged);
        },
        beforeUnmount() {
            this.events.off('set-active-tool', this.quickAccessToolChanged);
        },
        methods: {
            quickAccessToolChanged(toolType) {
                this.userTool = getNextPlayfieldTool(this.userTool, toolType, this.hitObjects);
            },
        },
    }
</script>

<style>
    .background-image {
        position: absolute;
        object-fit: cover;
        min-width: 100%;
        max-width: 100%;
        min-height: 100%;
        max-height: 100%;
    }
    .playfield-area {
        position: absolute;
        height: 80%;
        aspect-ratio: 4/3;
        left:50%;
        top:51.71%;
        transform:translate(-50%,-50%);

        border-style: solid;
        border-radius: 0.5%;
        border-width: 2px;
        border-color: rgb(255, 255, 255);
    }
</style>