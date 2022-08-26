<template>
    <BaseWidget ref="base-widget-container">
        <template #widget-icon>
            <img src="@/../assets/buttons/draw_FILL0_wght400_GRAD0_opsz48.svg" style="position:relative; width:200%; height:100%; left:-4px;"/>
        </template>
        <template #widget-content>
            <LinearTransformer 
                :zoom="this.zoom" 
                :offset="this.offset" 
            >
                <PlayfieldBackgroundImage 
                    :src="this.backgroundImageSrc" 
                    :widgetClientRect="this.widgetClientRect" 
                    :imageBrightness="this.imageBrightness"
                />
                <div class="playfield-area" ref="playfieldArea" 
                    :style="{
                        border: `dashed rgba(255, 255, 255, ${this.imageBrightness})`
                    }"
                />
                <PlayableComponentDrawingLayer 
                    :hitObjects="this.hitObjects" 
                    :playfieldClientRect="this.playfieldClientRect"
                    :widgetClientRect="this.widgetClientRect"
                    :circleSize="this.circleSize"
                    :editionMode="this.editionMode"
                    :key="this.playfieldId"
                />
            </LinearTransformer>
            <div class="event-catching-window" 
                @mousedown="this.playfieldClicked" 
                @mousemove="this.playfieldMouseMoved" 
                @mouseenter="this.mouseEntered" 
                @mouseleave="this.mouseExited" 
            />
            <PlayfieldToolSelector 
                @set-active-tool="this.quickAccessToolChanged"
                :areKeyBindingsActive="this.isMouseHovering"
                :shortcutListener="this.shortcutListener"
            />
        </template>
    </BaseWidget>
</template>

<script>
    import BaseWidget from '@/../src/app/ui/widget/generic/BaseWidget.vue';
    import { getNextPlayfieldTool } from '@/../src/app/ui/widget/playfield/tool_selector/playfieldToolSelector.js';
    import PlayfieldToolSelector from '@/../src/app/ui/widget/playfield/tool_selector/PlayfieldToolSelector.vue';
    import SelectTool from '@/../src/app/ui/widget/playfield/tools/SelectTool.js';
    import PlayfieldBackgroundImage from '@/../src/app/ui/widget/playfield/playfield_background_image/PlayfieldBackgroundImage.vue';
    import PlayableComponentDrawingLayer from '@/../src/app/ui/widget/playfield/PlayableComponentDrawingLayer.vue';
    import { calculateNewZoomValue } from '@/../src/app/ui/widget/playfield/zoomIncrementsCalculator.js';
    import LinearTransformer from '@/../src/app/ui/widget/playfield/LinearTransformer.vue'
    import { EditionMode } from '@/../src/app/ui/widget/playfield/EditionModeEnum.js';
    import { uuid } from '@/../src/util/uuid/uuid.js';
    import Vector2 from '@/../src/util/math/vector/Vector2.js';
    import { playfieldResolution } from '@/../src/app/game_data/playfield/resolution.js';

    const DEFAULT_VIEWPORT_ZOOM = 1;

    export default {
        name: 'PlayfieldArea',
        components: {
            BaseWidget,
            LinearTransformer,
            PlayfieldBackgroundImage,
            PlayableComponentDrawingLayer,
            PlayfieldToolSelector,
        },
        props: [
            'hitObjects',
            'circleSize',
            'backgroundImageSrc',
            'shortcutListener',
            'mouseListener',
            'actionHistory',
            'imageBrightness'
        ],
        data() {
            return {
                editionMode: EditionMode.hitObject,
                userTool: new SelectTool(this.hitObjects),
                playfieldId: uuid(),
                playfieldClientRect: null,
                widgetClientRect: null,
                zoom: DEFAULT_VIEWPORT_ZOOM,
                offset: new Vector2(0, 0),
                isMouseHovering: false,
            };
        },
        methods: {
            redrawHitObjects() {
                // Viewport zoom and viewport offset are CSS only. 
                // They do not interfere with the actual data. 
                const playfieldWidth = this.$refs['playfieldArea'].offsetWidth;
                const playfieldHeight = this.$refs['playfieldArea'].offsetHeight;
                this.playfieldClientRect = {
                    left: this.widgetClientRect.width*0.5 - playfieldWidth*0.5 + this.widgetClientRect.left,
                    top: this.widgetClientRect.height*0.5171 - playfieldHeight*0.5 + this.widgetClientRect.top,
                    width: playfieldWidth,
                    height: playfieldHeight,
                }
                this.playfieldId = uuid();
            },
            redraw() {
                this.updateWidgetClientRect();
                this.redrawHitObjects();
            },
            updateWidgetClientRect() {
                this.widgetClientRect = this.$refs['base-widget-container'].getWidgetClientRect();
            },
            quickAccessToolChanged(toolType) {
                this.userTool = getNextPlayfieldTool(this.userTool, toolType, this.hitObjects, this.getTransformedMousePosition(this.mouseListener.get()));
            },
            getTransformedMousePosition(clientMousePosition) {
                if(this.playfieldClientRect === null) return clientMousePosition;
                
                const scalingFactor = playfieldResolution.height / (this.playfieldClientRect.height * this.zoom);
                const offset = new Vector2(
                    this.playfieldClientRect.left + this.playfieldClientRect.width*(1-this.zoom)*0.5 + this.zoom*this.offset.x, 
                    this.playfieldClientRect.top + this.playfieldClientRect.height*(1-this.zoom)*0.5 + this.zoom*this.offset.y);
                return clientMousePosition.minus(offset).scaled(scalingFactor);
            },
            playfieldClicked(event) {
                this.userTool.mouseDown(event, this.getTransformedMousePosition(new Vector2(event.clientX, event.clientY)));
            },
            playfieldMouseMoved(event) {
                this.userTool.mouseMove(this.getTransformedMousePosition(new Vector2(event.clientX, event.clientY)));
            },
            mouseEntered() {
                if(this.isMouseHovering) return;
                this.isMouseHovering = true;
                window.addEventListener('wheel', this.mouseScroll);
            },
            mouseExited() {
                this.isMouseHovering = false;
                window.removeEventListener('wheel', this.mouseScroll);
            },
            mouseScroll(event) {
                this.zoom = calculateNewZoomValue(this.zoom, event.deltaY);
                this.userTool.mouseMove(this.getTransformedMousePosition(new Vector2(event.clientX, event.clientY)));
            },
        },
        mounted() {
            this.updateWidgetClientRect();
            this.resizeObserver = new ResizeObserver(() => {
                this.redraw();
            });
            this.resizeObserver.observe(this.$el.parentElement);
        },
        beforeUnmount() {
            this.resizeObserver.unobserve(this.$el.parentElement);
        },
    }
</script>

<style>
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
        
        border: dashed rgba(255, 255, 255, 0.3);
    }
    .event-catching-window {
        position: absolute;
        height: 100%;
        width: 100%;
    }
</style>