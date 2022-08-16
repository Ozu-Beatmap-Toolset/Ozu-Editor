<template>
    <div class="nested-widget-container widget-spacing-background-color"
        style="width:100%; height:100%"
    >
        <div :style="{width:this.leftChildWidth, height:this.leftChildHeight}">
            <slot name="left"/>
        </div>
        <div :style="{width:this.rightChildWidth, height:this.rightChildHeight}">
            <slot name="right"/>
        </div>
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
                binaryNode: new BinaryNode(),
                leftChildWidth: '50%',
                leftChildHeight: '100%',
                rightChildWidth: '50%',
                rightChildHeight: '100%',
            }
        },
        methods: {
            computeChildrenScale() {
                switch(this.widgetStackingType) {
                    case WidgetStackingType.HORIZONTAL:
                        this.leftChildWidth = this.ratio;
                        this.leftChildHeight = '100%';
                        this.rightChildWidth = `calc(100% - ${this.ratio})`;
                        this.rightChildHeight = '100%';
                        break;
                    case WidgetStackingType.VERTICAL:
                        this.leftChildWidth = '100%';
                        this.leftChildHeight = this.ratio;
                        this.rightChildWidth = '100%';
                        this.rightChildHeight = `calc(100% - ${this.ratio})`;
                        break;
                }
            },
        },
        mounted() {
            this.computeChildrenScale();
            this.binaryNode.value = this;
            if (typeof this.$parent !== undefined && typeof this.$parent.binaryNode !== "undefined") {
                this.$parent.binaryNode.addChild(this.binaryNode);
            }
        },
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