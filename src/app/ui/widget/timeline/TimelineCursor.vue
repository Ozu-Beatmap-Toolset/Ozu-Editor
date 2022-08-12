<template>
    <div 
        :style="{
            width:this.topRectWidth, 
            height:this.subHeaderHeight, 
            top:`calc(-${this.subHeaderHeight})`, 
            backgroundColor:this.strokeColor, 
            position:'absolute', 
            left:`calc(${this.position} - ${this.topRectWidth}/2)`,
            borderRadius:'3px',
            color:'white',
            font:`calc(${this.topRectWidth} - 5px) Arial, sans-serif`,
            textAlign:'center',
        }"
    >
        {{this.text}}
    </div>
    <TimeDivisionLine 
        :strokeColor="this.strokeColor" 
        :position="this.position" 
        :height="'100%'"
    />
</template>

<script>
    import TimeDivisionLine from '@/../src/app/ui/widget/timeline/TimeDivisionLine.vue';

    export default {
        name: 'TimelineCursor',
        components: {
            TimeDivisionLine,
        },
        props: ['position', 'subHeaderHeight', 'text'],
        data() {
            return {
                strokeColor: '#5FAFFF',
                topRectWidth: '16px',
            };
        },
    }
</script>

<style>
</style>