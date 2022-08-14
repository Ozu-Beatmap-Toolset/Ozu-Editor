<template>
    <div
        :style="{
            position: 'absolute', 
            width: '100%', 
            height: '100%', 
            left: `${this.zoom*this.offset.x}px`, 
            top: `${this.zoom*this.offset.y}px`, 
            transform: `scale(${this.zoom})`, 
        }"
    >
        <slot/>
    </div>
</template>

<script>
    export default {
        name: 'LinearTransformer',
        props: ['zoom', 'offset'],
    }
</script>

<style>
</style>