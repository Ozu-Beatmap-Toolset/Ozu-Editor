<template>
    <div class="playfield-area"/>
    <div class="full-playfield-area" @mousedown="playfieldClicked" @mousemove="playfieldMouseMoved" @mouseenter="mouseEntered" @mouseleave="mouseExit">
        <div v-for="hitobject in hitobjects" :key="hitobject.id">
            <div v-if="hitobject.opacity > 0.01">
                <HitObject 
                    :samples="this.getSamples(hitobject.bezierCurves)" 
                    :headDiameter="hitobject.headDiameter" 
                    :headDistance="hitobject.headDistance" 
                    :hitCircleSrc="this.skin.dict['hitcircle']" 
                    :hitCircleOverlaySrc="this.skin.dict['hitcircleoverlay']" 
                    :sliderBorderColour="this.getSliderBorderColour()" 
                    :opacity="hitobject.opacity" 
                />
            </div>
        </div>
    </div>
</template>

<script>
import { appData } from '@/../src/util/globals/GlobalData.js';
import { changePlayfieldTool, toolSelectorKeyPressed } from '@/../src/app/ui/playfield/playfieldToolSelector.js';
import HitObject from '@/../src/app/ui/playable_component/hitobject/HitObject.vue';
import { getSliderBorderColour } from '@/../src/app/game_data/skin/sliderBorderColour.js';

export default {
    name: "PlayfieldArea",
    components: {
    HitObject,
},
    data() {
        return {
            hitobjects: appData.playfield.hitobjects,
            skin: appData.skin,
        };
    },
    created() {
        this.events.on('set-active-tool', this.quickAccessToolChanged);
        window.addEventListener('keydown', this.keyPressed);
        window.setInterval(() => {
            for(const hitObject of appData.playfield.hitobjects) {
                hitObject.headDistance += 10;
                var totalLength = 0;
                const samples = this.getSamples(hitObject.bezierCurves);
                for(var i = 1; i < samples.length; i++) {
                    totalLength += samples[i-1].distance(samples[i]);
                }
                if(hitObject.headDistance > totalLength) {
                    if(totalLength > 0) {
                        hitObject.headDistance %= totalLength;
                    }
                    else {
                        hitObject.headDistance = 0;
                    }
                }
            }
        }, 16);
    },
    beforeUnmount() {
        this.events.off('set-active-tool', this.quickAccessToolChanged);
        window.removeEventListener('keydown', this.keyPressed);
    },
    methods: {
        getSamples(bezierCurves) {
            const samples = [];
            for(const bezierCurve of bezierCurves) {
                for(const sample of bezierCurve.samples) {
                    samples.push(sample);
                }
            }
            return samples;
        },
        getSliderBorderColour() {
            return getSliderBorderColour()
        },
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
        }
    },
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