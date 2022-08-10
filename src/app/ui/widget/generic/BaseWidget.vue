<template>
    <div class="widget-content" ref="widget" :style="{width:this.width, height:this.height, marginLeft:`${this.margin}px`, marginTop:`${this.margin}px`}">
        <slot>
            <img class="app-background-logo" src="@/../assets/logo/icon-v5.png"/>
        </slot>
    </div>
</template>

<script>
    import BinaryNode from '@/../src/util/data_structure/BinaryNode.js';

    export default {
        name: 'BaseWidget',
        data() {
            return {
                width: '100%',
                height: '100%',
                margin: 2,
                binaryNode: new BinaryNode(),
            }
        },
        methods: {
            getWidgetClientRect() {
                return {
                    left: this.$refs['widget'].offsetLeft,
                    top: this.$refs['widget'].offsetTop,
                    width: this.$refs['widget'].offsetWidth,
                    height: this.$refs['widget'].offsetHeight,
                }
            },
            setWidth(widthCss) {
                this.width = `calc(${widthCss} - ${this.margin}px`;
            },
            setHeight(heightCss) {
                this.height = `calc(${heightCss} - ${this.margin}px`;
            }
        },
        mounted() {
            if(typeof this.$parent !== undefined && typeof this.$parent.childMounted !== 'undefined') {
                this.$parent.childMounted(this);
            }
        },
        beforeUnmount() {
            if(typeof this.$parent !== undefined && typeof this.$parent.childUnmounting !== 'undefined') {
                this.$parent.childUnmounting(this);
            }
        }
    }
</script>

<style>
    .widget-content {
        position: relative;
        overflow: hidden;
        border-radius: 6px;
        background-color: #2A2A2A;
    }
</style>