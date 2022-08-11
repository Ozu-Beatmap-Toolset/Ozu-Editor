<template>
    <div class="timeline-bar" :style="{width:`${this.width}px`}">
        <TimelineCursor :position="this.timelineCursorPosition"/>
    </div>
</template>

<script>
    //import TimeDivisionLine from '@/../src/app/ui/widget/timeline/TimeDivisionLine.vue';
    import TimelineCursor from '@/../src/app/ui/widget/timeline/TimelineCursor.vue';

    export default {
        name: "TimelineBar",
        components: { 
            //TimeDivisionLine,
            TimelineCursor,
        },
        props: ['timelineCursorPosition', 'width'],
        data() {
            return {
                timeDivisionLines: [],
            };
        },
        created() {
            
        }
    }
</script>

<style>
    .timeline-bar {
        position:relative;
        height:100%;
    }
</style>