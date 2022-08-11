<template>
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
        <div class="playfield-area" ref="playfieldArea" :style="{border: `dashed rgba(255, 255, 255, ${this.imageBrightness})`}"/>
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

<script>
    import { getNextPlayfieldTool } from '@/../src/app/ui/widget/playfield/playfieldToolSelector.js';
    import { EditionMode } from '@/../src/app/ui/widget/playfield/EditionModeEnum.js';
    import SelectTool from '@/../src/app/ui/widget/playfield/tools/SelectTool.js';
    import PlayfieldEventHandlingLayer from '@/../src/app/ui/widget/playfield/PlayfieldEventHandlingLayer.vue';
    import PlayableComponentDrawingLayer from '@/../src/app/ui/widget/playfield/PlayableComponentDrawingLayer.vue';
    import { uuid } from '@/../src/util/uuid/uuid.js';

    const DEFAULT_VIEWPORT_ZOOM = 1;

    export default {
        name: 'PlayfieldArea',
        components: {
            PlayfieldEventHandlingLayer,
            PlayableComponentDrawingLayer
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

                const boxWidth = this.$el.parentElement.offsetWidth;
                const boxHeight = this.$el.parentElement.offsetHeight;
                const boxRatio = boxWidth / boxHeight;

                if(boxRatio > imgRatio) {
                    this.imageStyle = {
                        position: 'absolute',
                        top: `${boxHeight/2 - boxWidth/imgRatio/2}px`, 
                        width: `${boxWidth}px`, 
                        height: `${boxWidth/imgRatio}px`,
                        filter: `brightness(${this.imageBrightness})`,
                    };
                }
                else {
                    this.imageStyle = {
                        position: 'absolute',
                        left: `${boxWidth/2 - boxHeight*imgRatio/2}px`, 
                        width: `${boxHeight*imgRatio}px`, 
                        height: `${boxHeight}px`,
                        filter: `brightness(${this.imageBrightness})`,
                    };
                }
            },
            redrawHitObjects() {
                // Viewport zoom and viewport offset are CSS only. 
                // They do not interfere with the actual data. 

                this.widgetClientRect = this.$parent.getWidgetClientRect();

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
                this.computeImageStyle();
                this.redrawHitObjects();
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