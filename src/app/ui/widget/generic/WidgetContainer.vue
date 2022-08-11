<template>
    <div class="poly-widget-container app-background-color"
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

    export default {
        name: 'WidgetContainer',
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
            // for the child
            childMounted(child) {
                this.children.push(child);
                this.amountOfChildren++;
                this.$parent.scaleChild(child);
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
            // for the parent
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
    .poly-widget-container {
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
    }
</style>