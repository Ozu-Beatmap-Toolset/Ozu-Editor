<template>
    <BaseWidget>
        <template #widget-icon>
            <img src="@/../assets/buttons/schedule_FILL0_wght400_GRAD0_opsz48.svg" style="position:relative; width:200%; height:100%; left:-5px;"/>
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
                ref="timeline-bar-content"
                :style="{
                    width:`calc(${this.timelineWidth}px * ${this.zoom})`,
                    height:`calc(100% - ${this.subHeaderHeight})`, 
                    backgroundColor:this.backgroundColor,
                    transform:`translate(calc(${this.offset}px * ${this.zoom}), 0px)`,
                }"
            >
                <div v-for="timeDivision of this.redlines" :key="timeDivision.id">
                    <RepeatedDivisionLines 
                        :initialPosition="timeDivision.initialPosition" 
                        :separation="timedivision.separation" 
                        :initialCount="timedivision.initialCount" 
                        :amount="this.timelineWidth/timeDivision.separation" 
                        :color="timeDivision.color" 
                    />
                </div>
                <TimelineCursor 
                    :position="`calc(${this.timelineCursorPosition}px * ${this.zoom})`" 
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
    import { timeDivisionColors } from '@/../src/app/ui/widget/timeline/timeDivisionColors.js'

    const DEFAULT_TIMELINE_ZOOM = 1;
    const DEFAULT_1_BEAT_SEPARATION = '80px';

    // I think we should do 1px = 1ms, and just scale stuff according to that to display properly.

    export default {
        name: "TimelineBar",
        components: {
            TimelineCursor,
            RepeatedDivisionLines,
            BaseWidget
        },
        props: ['timelineCursorPosition', 'timelineWidth', 'timeDivision', 'redlines'],
        data() {
            return {
                subHeaderHeight: '12px',
                cursorText: '',
                subHeaderBackgroundColor: '#2A2A2A',
                backgroundColor: '#3C3C3C',
                offset: 0,
                zoom: DEFAULT_TIMELINE_ZOOM,
                DEFAULT_1_BEAT_SEPARATION: DEFAULT_1_BEAT_SEPARATION, 
            };
        },
        created() {
            this.zoom = 1;
            this.offset = -2200;
        },
    }
</script>

<style>
    .timeline-bar {
        position:absolute;
    }
</style>