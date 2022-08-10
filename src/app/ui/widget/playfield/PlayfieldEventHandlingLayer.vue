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
                const scalingFactor = playfieldResolution.height / (this.playfieldClientRect.height * this.zoom);
                const offset = new Vector2(
                    this.playfieldClientRect.left + this.playfieldClientRect.width*(1-this.zoom)*0.5, 
                    this.playfieldClientRect.top + this.playfieldClientRect.height*(1-this.zoom)*0.5);
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
                const direction = Math.sign(event.deltaY);
                this.zoom -= this.zoom/20 * direction;
                if(this.zoom > 2) {
                    this.zoom = 2;
                }
                if(this.zoom < 0.5) {
                    this.zoom = 0.5;
                }
                this.$emit('zoom-changed', this.zoom);
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