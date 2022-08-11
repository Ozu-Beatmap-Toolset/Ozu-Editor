<template>
    <WidgetContainer>
        <slot/>
    </WidgetContainer>
</template>

<script>
    import WidgetContainer from '@/../src/app/ui/widget/generic/WidgetContainer.vue';

    export default {
        name: 'VerticalWidgetContainer',
        components: {
            WidgetContainer,
        },
        data() {
            return {
                superObject: null,
            }
        },
        methods: {
            scaleChild(child) {
                child.setWidth('100%');
                child.setHeight('50%');
            },
            childMounted(superObject) {
                // using the child logging mechanism to register the super object, and forwarding the function call
                this.superObject = superObject;
            },
            childUnmounting(superObject) {
                superObject;
            },
            setWidth(widthCss) {
                this.superObject.setWidth(widthCss);
            },
            setHeight(heightCss) {
                this.superObject.setHeight(heightCss);
            },
        },
        mounted() {
            if(typeof this.$parent !== undefined && typeof this.$parent.childMounted !== 'undefined') {
                this.$parent.childMounted(this.superObject);
            }
        },
        beforeUnmount() {
            if(typeof this.$parent !== undefined && typeof this.$parent.childUnmounting !== 'undefined') {
                this.$parent.childUnmounting(this.superObject);
            }
        }
    }
</script>

<style></style>