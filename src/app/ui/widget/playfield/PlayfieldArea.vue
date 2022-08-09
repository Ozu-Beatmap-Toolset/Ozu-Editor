<template>
    <div class="full-playfield-area" 
        @mousedown="this.playfieldClicked" 
        @mousemove="this.playfieldMouseMoved" 
        @mouseenter="this.mouseEntered" 
        @mouseleave="this.mouseExit"
        :style="{
            position: 'absolute', 
            width: '100%', 
            height: '100%', 
            left: `${this.zoom*this.offset.x}px`,
            top: `${this.zoom*this.offset.y}px`,
            transform: `scale(${this.zoom})`
        }"
    >
        <img class="background-image" src="@/../assets/bg_test/sakura.jpeg"/>
        <div class="playfield-area"/>
        <div v-for="hitObject in this.hitObjects" :key="hitObject.id">
            <div v-if="hitObject.opacity > 0.01">
                <HitObject 
                    :samples="this.getSamples(hitObject.bezierCurves)" 
                    :controlPoints="this.getControlPoints(hitObject.bezierCurves)" 
                    :headDiameter="hitObject.headDiameter"  
                    :headDistance="hitObject.headDistance" 
                    :hitCircleSrc="this.skin.dict['hitcircle']" 
                    :hitCircleOverlaySrc="this.skin.dict['hitcircleoverlay']" 
                    :sliderBorderColour="this.getSliderBorderColour()" 
                    :opacity="hitObject.opacity" 
                    :editionMode="this.editionMode"
                />
            </div>
        </div>
    </div>
    <div class="event-catching-window"
        @mousedown="this.playfieldClicked" 
        @mousemove="this.playfieldMouseMoved" 
        @mouseenter="this.mouseEntered" 
        @mouseleave="this.mouseExit"
    />
    <ButtonList/>
</template>

<script>
    import HitObject from '@/../src/app/ui/playable_component/hitobject/HitObject.vue';
    import ButtonList from '@/../src/app/ui/widget/playfield/left_buttons/ButtonList.vue';
    import { getNextPlayfieldTool } from '@/../src/app/ui/widget/playfield/playfieldToolSelector.js';
    import { EditionMode } from '@/../src/app/ui/widget/playfield/EditionModeEnum.js';
    import { skin } from '@/../src/app/game_data/skin/skinData.js';
    import { getSliderBorderColour } from '@/../src/app/game_data/skin/sliderBorderColour.js';
    import SelectTool from '@/../src/app/ui/widget/playfield/tools/SelectTool.js';
    import ShortcutListener from '@/../src/util/user_input/ShortcutListener.js'
    import { ToolType } from '@/../src/app/ui/widget/playfield/tools/ToolTypeEnum.js';

    export default {
        name: "PlayfieldArea",
        components: {
            HitObject,
            ButtonList,
        },
        props: [
            'hitObjects',
            'backgroundImageSrc',
        ],
        data() {
            return {
                skin: skin,
                isMouseHovering: false,
                editionMode: EditionMode.hitObject,
                userTool: new SelectTool(this.hitObjects),
                keyListener: new ShortcutListener(),
                zoom: 1.3,
                offset: {x:100, y:100},
            };
        },
        created() {
            this.events.on('set-active-tool', this.quickAccessToolChanged);
            window.setInterval(() => {
                for(const hitObject of this.hitObjects) {
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
            this.keyListener.unregister();
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
            getControlPoints(bezierCurves) {
                const controlPoints = [];
                for(const bezierCurve of bezierCurves) {
                    for(const controlPoint of bezierCurve.controlPoints) {
                        controlPoints.push(controlPoint);
                    }
                }
                return controlPoints;
            },
            getSliderBorderColour() {
                return getSliderBorderColour()
            },
            mouseEntered() {
                if(this.isMouseHovering) return;
                this.isMouseHovering = true;
                this.keyListener.addKeybinding(['Escape'], () => {
                    this.events.emit('set-active-tool', ToolType.Select);
                });
                this.keyListener.addKeybinding(['Digit1'], () => {
                    this.events.emit('set-active-tool', ToolType.HitObjectPlacement);
                });
                this.keyListener.addKeybinding(['Digit2'], () => {
                    this.events.emit('set-active-tool', ToolType.HitSliclePlacement);
                });
                this.keyListener.addKeybinding(['Digit3'], () => {
                    this.events.emit('set-active-tool', ToolType.HitStreamPlacement);
                });
                this.keyListener.addKeybinding(['Digit4'], () => {
                    this.events.emit('set-active-tool', ToolType.HitSpinnerPlacement);
                });
                window.addEventListener('wheel', this.mouseScroll)
            },
            mouseExit() {
                this.isMouseHovering = false;
                this.keyListener.removeKeybinding(['Escape']);
                this.keyListener.removeKeybinding(['Digit1']);
                this.keyListener.removeKeybinding(['Digit2']);
                this.keyListener.removeKeybinding(['Digit3']);
                this.keyListener.removeKeybinding(['Digit4']);
                window.removeEventListener('wheel', this.mouseScroll)
            },
            mouseScroll(event) {
                const direction = Math.sign(event.deltaY);
                this.zoom -= this.zoom/20 * direction;
                if(this.zoom > 2) {
                    this.zoom = 2;
                }
                if(this.zoom < 0.5) {
                    this.zoom = 0.5;
                }
            },
            quickAccessToolChanged(toolType) {
                this.userTool = getNextPlayfieldTool(this.userTool, toolType, this.hitObjects);
            },
            playfieldClicked(event) {
                this.userTool.mouseDown(event, this.hitObjects);
            },
            playfieldMouseMoved(event) {
                this.userTool.mouseMove(event, this.hitObjects);
            },
        },
    }
</script>

<style>
    .event-catching-window {
        position: absolute;
        height: 100%;
        width: 100%;
    }
    .full-playfield-area {
        position: absolute;
        height: 100%;
        width: 100%;
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
    .background-image {
        position: absolute;
        object-fit: cover;
        min-width: 100%;
        max-width: 100%;
        min-height: 100%;
        max-height: 100%;
    }
</style>