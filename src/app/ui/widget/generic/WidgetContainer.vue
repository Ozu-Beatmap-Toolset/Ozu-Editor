<template>
    <div class="horizontal-widget-container app-background-color"
        :style="{
            width:this.width, 
            height: this.height, 
        }"
    >
        <slot/>
    </div>
</template>

<script>
    import BinaryNode from '@/../src/util/data_structure/BinaryNode.js';

    export default {
        name: 'WidgetContainer',
        data() {
            return {
                amountOfChildren: 0,
                children: [],
                width: '100%',
                height: '100%',
                binaryNode: new BinaryNode(),
            }
        },
        methods: {
            childMounted(child) {
                this.children.push(child);
                this.amountOfChildren++;
                child.setWidth('50%');
                child.setHeight('100%');
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
            setWidth(widthCss) {
                this.width = widthCss;
            },
            setHeight(heightCss) {
                this.height = heightCss;
            },
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
    .horizontal-widget-container {
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
    }
</style>