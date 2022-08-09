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
    import ShortcutListener from '@/../src/util/user_input/ShortcutListener';

    export default {
        name: 'PlayfieldEventHandlingLayer',
        components: {
            ButtonList,
        },
        props: ['userTool'],
        data() {
            return {
                isMouseHovering: false,
                keyListener: new ShortcutListener(),
                zoom: 1,
                offset: {x:0, y:0},
            }
        },
        methods: {
            playfieldClicked(event) {
                this.userTool.mouseDown(event, this.hitObjects);
            },
            playfieldMouseMoved(event) {
                this.userTool.mouseMove(event, this.hitObjects);
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
        },
        beforeUnmount() {
            this.keyListener.unregister();
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
</style>