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
            transform: `scale(${this.zoom})`, 
        }"
    >
        <slot/>
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
    import { ToolType } from '@/../src/app/ui/widget/playfield/tools/ToolTypeEnum.js';
    import ButtonList from '@/../src/app/ui/widget/playfield/left_buttons/ButtonList.vue';
    import { playfieldResolution } from '@/../src/app/game_data/playfield/resolution.js';
    import Vector2 from '@/../src/util/math/vector/Vector2.js';

    const ZOOM_FACTOR_ON_SCROOL = 1 + 1/20;

    export default {
        name: 'PlayfieldEventHandlingLayer',
        components: {
            ButtonList,
        },
        props: ['userTool', 'shortcutListener', 'mouseListener', 'playfieldClientRect'],
        emits: ['zoom-changed', 'offset-changed', 'set-active-tool'],
        data() {
            return {
                isMouseHovering: false,
                zoom: 1,
                offset: {x:0, y:0},
            }
        },
        methods: {
            getTransformedMousePosition() {
                const clientMousePosition = this.mouseListener.get();
                if(this.playfieldClientRect == null) return clientMousePosition;
                
                const scalingFactor = playfieldResolution.height / (this.playfieldClientRect.height * this.zoom);
                const offset = new Vector2(
                    this.playfieldClientRect.left + this.playfieldClientRect.width*(1-this.zoom)*0.5 + this.zoom*this.offset.x, 
                    this.playfieldClientRect.top + this.playfieldClientRect.height*(1-this.zoom)*0.5 + this.zoom*this.offset.y);
                return clientMousePosition.minus(offset).scaled(scalingFactor);
            },
            playfieldClicked(event) {
                this.userTool.mouseDown(event, this.getTransformedMousePosition());
            },
            playfieldMouseMoved() {
                this.userTool.mouseMove(this.getTransformedMousePosition());
            },
            mouseEntered() {
                if(this.isMouseHovering) return;
                this.isMouseHovering = true;
                
                this.shortcutListener.addKeybinding(['Escape'], () => {
                    this.$emit('set-active-tool', ToolType.Select, this.getTransformedMousePosition());
                });
                this.shortcutListener.addKeybinding(['Digit1'], () => {
                    this.$emit('set-active-tool', ToolType.HitObjectPlacement, this.getTransformedMousePosition());
                });
                this.shortcutListener.addKeybinding(['Digit2'], () => {
                    this.$emit('set-active-tool', ToolType.HitSliclePlacement, this.getTransformedMousePosition());
                });
                this.shortcutListener.addKeybinding(['Digit3'], () => {
                    this.$emit('set-active-tool', ToolType.HitStreamPlacement, this.getTransformedMousePosition());
                });
                this.shortcutListener.addKeybinding(['Digit4'], () => {
                    this.$emit('set-active-tool', ToolType.HitSpinnerPlacement, this.getTransformedMousePosition());
                });
                window.addEventListener('wheel', this.mouseScroll);
            },
            mouseExit() {
                this.isMouseHovering = false;
                
                this.shortcutListener.removeKeybinding(['Escape']);
                this.shortcutListener.removeKeybinding(['Digit1']);
                this.shortcutListener.removeKeybinding(['Digit2']);
                this.shortcutListener.removeKeybinding(['Digit3']);
                this.shortcutListener.removeKeybinding(['Digit4']);
                window.removeEventListener('wheel', this.mouseScroll);
            },
            mouseScroll(event) {
                if(event.deltaY < 0) {
                    this.zoom *= ZOOM_FACTOR_ON_SCROOL;
                }
                else {
                    this.zoom /= ZOOM_FACTOR_ON_SCROOL;
                }
                if(this.zoom > 1.9799315994393984) {
                    this.zoom = 1.9799315994393984;
                }
                if(this.zoom < 0.5050679529955184) {
                    this.zoom = 0.5050679529955184;
                }
                if(Math.abs(this.zoom-1) < 0.0001) {
                    this.zoom = 1;
                }
                this.$emit('zoom-changed', this.zoom);
                this.userTool.mouseMove(this.getTransformedMousePosition());
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
</style>