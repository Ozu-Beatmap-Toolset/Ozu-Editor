<template>
    <div class="app-content app-background-color">
        <img class="app-background-logo" src="@/../assets/logo/icon-v5.png"
            :style="{transform:`translate(${this.x - 125}px, ${this.y - 125}px)`}" />
    </div>
    <div class="app-content background-transparent-color"
        @mousemove="this.mouseMove">
        
    </div>
</template>

<script>
    //import PlayfieldArea from '@/../src/app/ui/widget/playfield/PlayfieldArea.vue';
    //import ShortcutListener from '@/../src/util/user_input/ShortcutListener.js';
    //import CursorPosition from '@/../src/util/user_input/CursorPosition.js';
    //import ActionHistory from '@/../src/util/action/ActionHistory.js';
    //import BaseWidget from '@/../src/app/ui/widget/generic/BaseWidget.vue';
    //import NestedWidgetContainer from '@/../src/app/ui/widget/generic/NestedWidgetContainer.vue';
    import { WidgetStackingType } from '@/../src/app/ui/widget/generic/NestedWidgetStackingType.js';
    //import Vector2 from '@/../src/util/math/vector/Vector2.js';
    //import TimelineBar from '@/../src/app/ui/widget/timeline/TimelineBar.vue';

    export default {
        name: 'App',
        components: {
            //PlayfieldArea,
            //BaseWidget,
            //NestedWidgetContainer,
            //TimelineBar
        },
        data() {
            return {
                hitObjects: [],
                //shortcutListener: new ShortcutListener(),
                //mouseListener: new CursorPosition(new Vector2(0, 0)),
                //actionHistory: new ActionHistory(),
                WidgetStackingType,
                ratio: '50%',
                x: 0,
                y: 0,
            };
        },
        methods: {
            mouseMove(event) {
                this.x = event.clientX;
                this.y = event.clientY;
            }
        },
        beforeUnmount() {
            this.shortcutListener.unregister();
            this.mouseListener.unregister();
        }
    }
</script>

<style>
    body {
        overflow: hidden;
        user-select: none;
    }
    .app-background-color {
        background-color: #333;
    }
    .background-transparent-color {
        background-color: rgba(0, 0, 0, 0);
    }
    .app-background-logo {
        position: absolute;
        width: 250px;
        height: 250px;
        filter: grayscale(1) opacity(0.25) contrast(0.9);
        transform: translate(-50%, -50%);
        -webkit-user-drag: none;
    }
    .app-content {
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0%;
        top: 0%;
    }
</style>
