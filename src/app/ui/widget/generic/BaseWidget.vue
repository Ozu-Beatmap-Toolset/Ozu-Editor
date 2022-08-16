<template>
    <div class="widget-frame"
        :style="{
            position:'relative',
            width:`calc(100% - ${this.margin*2}px)`, 
            height:`calc(100% - ${this.margin*2}px)`, 
            margin:`${this.margin}px`, 
        }"
    >
        <div class="widget-header-bar"
            :style="{
                position:'relative', 
                width:'100%', 
                height:this.widgetHeaderHeight, 
                backgroundColor:'#3A3A3A', 
                zIndex:2,
            }"
        >
            <button 
                :style="{
                    width:this.widgetHeaderHeight, 
                    height:this.widgetHeaderHeight,
                    backgroundColor:'#666',
                    borderRadius:'6px',
                    position:'relative',
                    left:'0px'
                }"
            >
                <slot name="widget-icon"/>
            </button>
            <slot name="widget-header-bar"/>
        </div>
        <div class="widget-content" ref="widget-content" 
            :style="{
                position:'relative', 
                width:'100%',
                height:`calc(100% - ${this.widgetHeaderHeight})`,
            }"
        >
            <slot name="widget-content">
                <img class="app-background-logo" src="@/../assets/logo/icon-v5.png"/>
            </slot>
        </div>
    </div>
</template>

<script>
    import BinaryNode from '@/../src/util/data_structure/BinaryNode.js';

    export default {
        name: "BaseWidget",
        data() {
            return {
                width: "100%",
                height: "100%",
                margin: 1.5,
                widgetHeaderHeight: '25px',
                binaryNode: new BinaryNode(),
            };
        },
        methods: {
            getWidgetClientRect() {
                return this.$refs["widget-content"].getBoundingClientRect();
            },
        },
        mounted() {
            this.binaryNode.value = this;
            if (typeof this.$parent !== undefined && typeof this.$parent.binaryNode !== "undefined") {
                this.$parent.binaryNode.addChild(this.binaryNode);
            }
        },
    }
</script>

<style>
    .widget-frame {
        overflow: hidden;
        border-radius: 6px;
        background-color: #282828;
    }
</style>