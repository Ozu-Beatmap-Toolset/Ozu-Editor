<template>
    <BaseWidget ref="widget-content">
        <template #widget-icon>
            <img src="@/../assets/buttons/schedule_FILL0_wght400_GRAD0_opsz48.svg" style="position:relative; width:200%; height:100%; left:-5px;"/>
        </template>
        <template #widget-content>
            <div class="timeline-sub-header-bar"
                :style="{
                    width:'100%',
                    height:this.subHeaderHeight, 
                    backgroundColor:'#2A2A2A'
                }"
            />
            <div class="timeline-bar" 
                ref="timeline-bar-content"
                :style="{
                    position:'absolute',
                    left:`${-this.offset * this.zoom}px`,
                    width:`${(this.timelineWidth) * this.zoom}px`,
                    height:`calc(100% - ${this.subHeaderHeight})`, 
                    backgroundColor:this.backgroundColor,
                }"
            >
                <div v-for="redline of this.redlines" :key="redline.id">
                    <RedlineRenderer 
                        :redline="redline"
                        :amountOfDivisions="this.timeDivision"
                    />
                    <RepeatedDivisionLines 
                        :start="this.findStartPosition(redline)" 
                        :end="this.findEndPosition(redline)"
                        :separation="this.findSeparation(redline)" 
                        :color="this.findColor(redline)" 
                    />
                </div>
                <TimelineCursor 
                    :position="`${this.currentTime * this.zoom}px`" 
                    :subHeaderHeight="this.subHeaderHeight" 
                    :text="this.cursorText" 
                />
            </div>
            <div class="timeline-event-listening" 
                :style="{position:'absolute', width:'100%', height:'100%', top:`${-this.subHeaderHeight}px`}" 
                @mouseenter="this.mouseEntered" 
                @mouseleave="this.mouseExited" 
                @mousedown="this.timelineClicked" 
                @mouseup="this.timelineReleased" 
                @mousemove="this.timelineDragged" 
            />
        </template>
    </BaseWidget>
</template>

<script>
    import TimelineCursor from '@/../src/app/ui/widget/timeline/TimelineCursor.vue';
    import RepeatedDivisionLines from '@/../src/app/ui/widget/timeline/RepeatedDivisionLines.vue';
    import BaseWidget from '@/../src/app/ui/widget/generic/BaseWidget.vue';
    import RedlineRenderer from '@/../src/app/ui/widget/timeline/RedlineRenderer.vue'
    //import { timeDivisionColors } from '@/../src/app/ui/widget/timeline/timeDivisionColors.js';

    const DEFAULT_TIMELINE_ZOOM = 0.1;
    const TIMELINE_SCROLL_FACTOR = 1 + 1/20;

    export default {
        name: "TimelineBar",
        components: {
            TimelineCursor,
            RepeatedDivisionLines,
            BaseWidget,
            RedlineRenderer,
        },
        props: ['currentTime', 'timelineWidth', 'timeDivision', 'redlines'],
        emits: ['change-current-time'],
        data() {
            return {
                subHeaderHeight: '12px',
                cursorText: '',
                subHeaderBackgroundColor: '#2A2A2A',
                backgroundColor: '#3C3C3C',
                zoom: DEFAULT_TIMELINE_ZOOM,
                offset: 0,
                widgetWidth: null,
                widgetLeft: null,
                resizeObserver: null,
                isMouseHovering: false,
                isMousePressed: false,
            };
        },
        methods: {
            findStartPosition(redline) {
                let virtualStart = (redline.initialPosition - this.offset) * this.zoom;
                if(virtualStart < 0) {
                    let separationPx = this.findSeparation(redline);
                    return virtualStart + this.offset * this.zoom - Math.round(virtualStart/separationPx) * separationPx;
                }
                return virtualStart + this.offset * this.zoom;
            },
            findEndPosition() {
                let virtualEnd = (this.timelineWidth) * this.zoom;
                if(virtualEnd > this.widgetWidth + this.offset * this.zoom) {
                    return this.widgetWidth + this.offset * this.zoom;
                }
                return virtualEnd;
            },
            findSeparation(redline) {
                let separationMs = 60000/redline.bpm;
                return separationMs * this.zoom;
            },
            findColor(redline) {
                redline;
                return '#666';
            },
            updateClientWidth() {
                let widgetRect = this.$refs['widget-content'].getWidgetClientRect();
                this.widgetWidth = widgetRect.width;
                this.widgetLeft = widgetRect.left;
            },
            mouseEntered() {
                if(this.isMouseHovering) return;
                this.isMouseHovering = true;
                window.addEventListener('wheel', this.mouseScroll);
            },
            mouseExited() {
                this.isMouseHovering = false;
                this.isMousePressed = false;
                window.removeEventListener('wheel', this.mouseScroll);
            },
            timelineClicked(event) {
                this.isMousePressed = true;
                let positionMs = (event.clientX - this.widgetLeft) / this.zoom + this.offset;
                this.$emit('change-current-time', positionMs);
            },
            timelineReleased() {
                this.isMousePressed = false;
            },
            timelineDragged(event) {
                if(!this.isMousePressed) return;
                let positionMs = (event.clientX - this.widgetLeft) / this.zoom + this.offset;
                this.$emit('change-current-time', positionMs);
            },
            mouseScroll(event) {
                let mouseX = (event.clientX - this.widgetLeft) / this.zoom;
                if(-event.deltaY > 0) {
                    this.zoom *= TIMELINE_SCROLL_FACTOR;
                    this.offset += mouseX*TIMELINE_SCROLL_FACTOR - mouseX;
                }
                else {
                    this.zoom /= TIMELINE_SCROLL_FACTOR;
                    this.offset += mouseX/TIMELINE_SCROLL_FACTOR - mouseX;
                }
            }
        },
        created() {
            this.zoom = 0.2;
            this.offset = -1000;
        },
        mounted() {
            this.resizeObserver = new ResizeObserver(() => {
                this.updateClientWidth();
            });
            this.resizeObserver.observe(this.$el.parentElement);
        },
        beforeUnmount() {
            this.resizeObserver.unobserve(this.$el.parentElement);
        },
    }
</script>

<style>

</style>