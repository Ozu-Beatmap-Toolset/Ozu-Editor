<template>
    <div class="widget-frame"
        :style="{
            width:this.width, 
            height:this.height, 
            marginLeft:`${this.margin}px`, 
            marginTop:`${this.margin}px`
        }"
    >
        <div class="widget-header-bar"
            :style="{
                position:'relative', 
                width:'100%', 
                height:'25px', 
                backgroundColor:'#3A3A3A', 
                zIndex:2,
            }"
        >
            <button>

            </button>
        </div>
        <div class="widget-content" ref="widget-content" 
            :style="{
                position:'relative', 
                width:'100%', 
                height:`calc(100% - ${this.widgetHeaderHeight})`
            }"
        >
            <slot>
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
            margin: 2,
            widgetHeaderHeight: '25px',
            binaryNode: new BinaryNode(),
        };
    },
    methods: {
        getWidgetClientRect() {
            return {
                left: this.$refs["widget-content"].offsetLeft,
                top: this.$refs["widget-content"].offsetTop,
                width: this.$refs["widget-content"].offsetWidth,
                height: this.$refs["widget-content"].offsetHeight,
            };
        },
        setWidth(widthCss) {
            this.width = `calc(${widthCss} - ${this.margin}px`;
        },
        setHeight(heightCss) {
            this.height = `calc(${heightCss} - ${this.margin}px`;
        }
    },
    mounted() {
        this.binaryNode.value = this;
        if (typeof this.$parent !== undefined && typeof this.$parent.childMounted !== "undefined") {
            this.$parent.childMounted(this);
        }
    },
    beforeUnmount() {
        if (typeof this.$parent !== undefined && typeof this.$parent.childUnmounting !== "undefined") {
            this.$parent.childUnmounting(this);
        }
    },
}
</script>

<style>
    .widget-frame {
        overflow: hidden;
        border-radius: 6px;
        background-color: #2A2A2A;
    }
</style>