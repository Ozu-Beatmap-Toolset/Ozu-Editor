<template>
    <BaseWidget ref="base-widget-container">
        <template #widget-icon>
            <img src="@/../assets/buttons/draw_FILL0_wght400_GRAD0_opsz48.svg" style="position:relative; width:200%; height:100%; left:-4px;"/>
        </template>
        <template #widget-content>
            <PlayfieldEventHandlingLayer 
                @set-active-tool="this.quickAccessToolChanged"
                @zoom-changed="this.onZoomChange"
                :userTool="this.userTool"
                :shortcutListener="this.shortcutListener"
                :mouseListener="this.mouseListener"
                :playfieldClientRect="this.playfieldClientRect"
            >
                <img ref="backgroundImage" 
                    :src="this.backgroundImageSrc" 
                    :style="this.imageStyle" 
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
            </PlayfieldEventHandlingLayer>
        </template>
    </BaseWidget>
</template>

<script>
    import { getNextPlayfieldTool } from '@/../src/app/ui/widget/playfield/playfieldToolSelector.js';
    import { EditionMode } from '@/../src/app/ui/widget/playfield/EditionModeEnum.js';
    import SelectTool from '@/../src/app/ui/widget/playfield/tools/SelectTool.js';
    import PlayfieldEventHandlingLayer from '@/../src/app/ui/widget/playfield/PlayfieldEventHandlingLayer.vue';
    import PlayableComponentDrawingLayer from '@/../src/app/ui/widget/playfield/PlayableComponentDrawingLayer.vue';
    import { uuid } from '@/../src/util/uuid/uuid.js';
    import BaseWidget from '@/../src/app/ui/widget/generic/BaseWidget.vue';
    import { generateBackgroundImageStyle } from '@/../src/app/ui/widget/playfield/backgroundImageStyleGenerator.js';

    const DEFAULT_VIEWPORT_ZOOM = 1;

    export default {
        name: 'PlayfieldArea',
        components: {
            PlayfieldEventHandlingLayer,
            PlayableComponentDrawingLayer,
            BaseWidget,
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
                imageStyle: {
                    position: 'absolute',
                    objectFit: 'cover',
                    minWidth: '100%',
                    minHeight: '100%',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    filter: `brightness(${this.imageBrightness})`,
                },
                playfieldId: uuid(),
                playfieldClientRect: null,
                widgetClientRect: null,
                zoom: DEFAULT_VIEWPORT_ZOOM,
            };
        },
        methods: {
            computeImageStyle() {
                const image = this.$refs.backgroundImage;
                const imgWidth = image.naturalWidth;
                const imgHeight = image.naturalHeight;
                if(imgWidth === 0 && imgHeight === 0) return;
                const imgRatio = imgWidth / imgHeight;

                const boxWidth = this.widgetClientRect.width;
                const boxHeight = this.widgetClientRect.height;
                const boxRatio = boxWidth/boxHeight;
                
                this.imageStyle = generateBackgroundImageStyle(imgRatio, boxWidth, boxHeight, boxRatio, this.imageBrightness);
            },
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
                this.updateWidgetContentRect();
                this.computeImageStyle();
                this.redrawHitObjects();
            },
            updateWidgetContentRect() {
                this.widgetClientRect = this.$refs['base-widget-container'].getWidgetClientRect();
            },
            quickAccessToolChanged(toolType, mousePositionInOsuCoordinates) {
                this.userTool = getNextPlayfieldTool(this.userTool, toolType, this.hitObjects, mousePositionInOsuCoordinates);
            },
            onZoomChange(newZoom) {
                this.zoom = newZoom;
                this.computeImageStyle();
            },
        },
        mounted() {
            this.updateWidgetContentRect();
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
</style>