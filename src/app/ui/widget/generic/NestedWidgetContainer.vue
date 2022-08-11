<template>
    <div class="nested-widget-container widget-spacing-background-color"
        :style="{
            width: this.width, 
            height: this.height, 
        }"
    >
        <slot/>
    </div>
</template>

<script>
    import BinaryNode from '@/../src/util/data_structure/BinaryNode.js';
    import { WidgetStackingType } from '@/../src/app/ui/widget/generic/NestedWidgetStackingType.js';

    export default {
        name: 'NestedWidgetContainer',
        props: {
            widgetStackingType: {
                default: WidgetStackingType.HORIZONTAL,
            },
            ratio: {
                default: '50%',
            },
        },
        data() {
            return {
                amountOfChildren: 0,
                children: [],
                binaryNode: new BinaryNode(),
                width: '100%',
                height: '100%',
            }
        },
        methods: {
            childMounted(child) {
                this.children.push(child);
                this.amountOfChildren++;
                this.scaleChild(child);
                this.binaryNode.addChild(child.binaryNode);
            },
            childUnmounting(child) {
                const indexOfChild = this.children.indexOf(child);
                if(indexOfChild > -1) {
                    this.children.splice(indexOfChild, 1);
                    this.binaryNode.removeChild(child.binaryNode);
                }
                this.amountOfChildren--;
            },
            scaleChild(child) {
                switch(this.widgetStackingType) {
                    case WidgetStackingType.VERTICAL:
                        child.setWidth('100%');
                        if(this.amountOfChildren === 1) child.setHeight(this.ratio);
                        else child.setHeight(`calc(100% - ${this.ratio})`);
                        break;
                    case WidgetStackingType.HORIZONTAL:
                        if(this.amountOfChildren === 1) child.setWidth(this.ratio);
                        else child.setWidth(`calc(100% - ${this.ratio})`);
                        child.setHeight('100%');
                        break;
                }
            },
            setWidth(widthCss) {
                this.width = widthCss;
            },
            setHeight(heightCss) {
                this.height = heightCss;
            },
        },
        mounted() {
            this.binaryNode.value = this;
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
    .nested-widget-container {
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
    }
    .widget-spacing-background-color {
        background-color: #222222;
    }
</style>