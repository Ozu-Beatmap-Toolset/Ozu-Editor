<template>
    <div class="playfield-area"/>
    <div class="full-playfield-area" @mousedown="playfieldClicked" @mousemove="playfieldMouseMoved" @mouseenter="mouseEntered" @mouseleave="mouseExit"/>
</template>

<script>
import { appData } from '../../../util/globals/GlobalData.js';
import { changePlayfieldTool, toolSelectorKeyPressed } from './playfieldToolSelector.js';

export default {
    name: "PlayfieldArea",
    components: {

    },
    methods: {
        mouseEntered: () => {
            appData.playfield.isMouseHovering = true;
        },
        mouseExit: () => {
            appData.playfield.isMouseHovering = false;
        },
        quickAccessToolChanged(toolType) {
            changePlayfieldTool(toolType);
            
        },
        playfieldClicked(event) {
            appData.playfield.currentUserTool.mouseDown(event);
        },
        playfieldMouseMoved(event) {
            appData.playfield.currentUserTool.mouseMove(event);
        },
        keyPressed(event) {
            if(appData.playfield.isMouseHovering) {
                toolSelectorKeyPressed(event, this.events);
            }
        },
    },
    created() {
        this.events.on('set-active-tool', this.quickAccessToolChanged);
        window.addEventListener('keydown', this.keyPressed);
    },
    beforeUnmount() {
        this.events.off('set-active-tool', this.quickAccessToolChanged);
        window.removeEventListener('keydown', this.keyPressed);
    }
}
</script>

<style>
.full-playfield-area {
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    position: absolute;
}

.playfield-area {
    height: 80%;
    aspect-ratio: 4/3;
    position: absolute;
    top:51.71%;
    left:50%;
    transform:translate(-50%,-50%);

    border-style: solid;
    border-radius: 0.5%;
    border-width: 2px;
    border-color: rgb(255, 255, 255);
}
</style>