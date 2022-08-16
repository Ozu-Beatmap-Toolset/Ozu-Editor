<template>
    <img ref="backgroundImage" 
        :src="this.src" 
        :style="this.imageStyle" 
    />
</template>

<script>
    import { generateBackgroundImageStyle } from '@/../src/app/ui/widget/playfield/playfield_background_image/backgroundImageStyleGenerator.js';

    export default {
        name: 'PlayfieldBackgroundImage',
        props: ['src', 'widgetClientRect', 'imageBrightness'],
        data() {
            return {
                imageStyle: {
                    position: 'absolute',
                    objectFit: 'cover',
                    minWidth: '100%',
                    minHeight: '100%',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    filter: `brightness(${this.imageBrightness})`,
                },
            }
        },
        methods: {
            computeImageStyle() {
                const image = this.$refs.backgroundImage;
                const imgWidth = image.naturalWidth;
                const imgHeight = image.naturalHeight;
                if(imgWidth === 0 && imgHeight === 0) return;
                const imgRatio = imgWidth / imgHeight;

                if(this.widgetClientRect == null) return;

                const boxWidth = this.widgetClientRect.width;
                const boxHeight = this.widgetClientRect.height;
                const boxRatio = boxWidth / boxHeight;
                
                this.imageStyle = generateBackgroundImageStyle(imgRatio, boxWidth, boxHeight, boxRatio, this.imageBrightness);
            },
        },
        beforeUpdate() {
            this.computeImageStyle();
        },
        mounted() {
            this.computeImageStyle();
        }
    }
</script>

<style>

</style>