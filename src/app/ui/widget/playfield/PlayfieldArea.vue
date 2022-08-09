<template>
    <PlayfieldEventHandlingLayer 
        @zoom-changed="this.zoomChanged" 
        @set-active-tool="this.quickAccessToolChanged" 
        :userTool="this.userTool">
        <img ref="backgroundImage"
            :src="this.backgroundImageSrc"
            :style="this.imageStyle"
        />
        <div class="playfield-area"/>
        <PlayableComponentDrawingLayer :hitObjects="this.hitObjects" :editionMode="this.editionMode"/>
    </PlayfieldEventHandlingLayer>
</template>

<script>
    import { getNextPlayfieldTool } from '@/../src/app/ui/widget/playfield/playfieldToolSelector.js';
    import { EditionMode } from '@/../src/app/ui/widget/playfield/EditionModeEnum.js';
    import SelectTool from '@/../src/app/ui/widget/playfield/tools/SelectTool.js';
    import PlayfieldEventHandlingLayer from '@/../src/app/ui/widget/playfield/PlayfieldEventHandlingLayer.vue';
    import PlayableComponentDrawingLayer from '@/../src/app/ui/widget/playfield/PlayableComponentDrawingLayer.vue';

    const DEFAULT_ZOOM_VALUE = 1;

    export default {
        name: 'PlayfieldArea',
        components: {
            PlayfieldEventHandlingLayer,
            PlayableComponentDrawingLayer
        },
        props: [
            'hitObjects',
            'backgroundImageSrc',
        ],
        data() {
            return {
                editionMode: EditionMode.hitObject,
                userTool: new SelectTool(this.hitObjects),
                imageStyle: {
                    position: 'absolute',
                    objectFit: 'cover',
                    minWidth: `${100}%`,
                    minHeight: `${100}%`,
                    maxWidth: `${100}%`,
                    maxHeight: `${100}%`,
                },
            };
        },
        methods: {
            computeImageStyle(zoom) {
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
            quickAccessToolChanged(toolType) {
                this.userTool = getNextPlayfieldTool(this.userTool, toolType, this.hitObjects);
            },
            zoomChanged(zoom) {
                this.computeImageStyle(zoom);
            },
        },
        mounted() {
            this.computeImageStyle(DEFAULT_ZOOM_VALUE);
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
    }
</style>