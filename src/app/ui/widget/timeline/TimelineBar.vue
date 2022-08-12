<template>
    <BaseWidget>
        <template #widget-icon>
            Timeline
        </template>
        <template #widget-content>
            <div 
                :style="{
                    width:'100%',
                    height:this.subHeaderHeight, 
                    backgroundColor:'#2A2A2A'
                }"
            />
            <div class="timeline-bar" 
                :style="{
                    height:`calc(100% - ${this.subHeaderHeight})`, 
                    backgroundColor:this.backgroundColor
                }"
            >
                <RepeatedDivisionLines
                    initialPosition="-12px"
                    separation="40px"
                    amount="50"
                    color="#4C4C4C"
                />
                <RepeatedDivisionLines
                    initialPosition="-12px"
                    separation="80px"
                    amount="50"
                    color="#666"
                />
                <TimelineCursor 
                    :position="this.timelineCursorPosition"
                    :subHeaderHeight="this.subHeaderHeight" 
                    :text="this.cursorText"
                />
            </div>
        </template>
    </BaseWidget>
</template>

<script>
    import TimelineCursor from '@/../src/app/ui/widget/timeline/TimelineCursor.vue';
    import RepeatedDivisionLines from '@/../src/app/ui/widget/timeline/RepeatedDivisionLines.vue';
    import BaseWidget from '@/../src/app/ui/widget/generic/BaseWidget.vue';

    export default {
        name: "TimelineBar",
        components: {
            TimelineCursor,
            RepeatedDivisionLines,
            BaseWidget
        },
        props: ['timelineCursorPosition'],
        data() {
            return {
                subHeaderHeight: '12px',
                cursorText: '',
                subHeaderBackgroundColor: '#2A2A2A',
                backgroundColor: '#3C3C3C',
            };
        },
    }
</script>

<style>
    .timeline-bar {
        position:relative;
        width:100%;
    }
</style>