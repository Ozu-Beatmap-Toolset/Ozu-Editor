<template>
    <PlayfieldEventHandlingLayer 
        @set-active-tool="this.quickAccessToolChanged"
        :userTool="this.userTool"
        :shortcutListener="this.shortcutListener"
    >
        <img ref="backgroundImage"
            :src="this.backgroundImageSrc"
            :style="this.imageStyle"
        />
        <div class="playfield-area" ref="playfieldArea"/>
        <PlayableComponentDrawingLayer 
            :hitObjects="this.hitObjects" 
            :playfieldClientRect="this.playfieldClientRect"
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
            'shortcutListener'
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
                },
                playfieldId: uuid(),
                playfieldClientRect: null,
            };
        },
        methods: {
            computeImageStyle() {
                const image = this.$refs.backgroundImage;
                const imgWidth = image.naturalWidth;
                const imgHeight = image.naturalHeight;
                if(imgWidth === 0 && imgHeight === 0) return this.imageScale;
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
                    };
                }
                else {
                    this.imageStyle = {
                        position: 'absolute',
                        left: `${boxWidth/2 - boxHeight*imgRatio/2}px`, 
                        width: `${boxHeight*imgRatio}px`, 
                        height: `${boxHeight}px`,
                    };
                }
            },
            redrawHitObjects() {
                this.playfieldClientRect = {
                    left: this.$refs['playfieldArea'].offsetLeft,
                    top: this.$refs['playfieldArea'].offsetTop,
                    width: this.$refs['playfieldArea'].offsetWidth,
                    height: this.$refs['playfieldArea'].offsetHeight,
                }
                this.playfieldId = uuid();
            },
            quickAccessToolChanged(toolType) {
                this.userTool = getNextPlayfieldTool(this.userTool, toolType, this.hitObjects);
            },
        },
        mounted() {
            this.resizeObserver = new ResizeObserver(() => {
                this.computeImageStyle();
                this.redrawHitObjects();
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
        border-color: rgb(255, 255, 255);
        
        border: dashed rgb(255, 255, 255);
    }
</style>