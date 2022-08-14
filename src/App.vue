<template>
    <div class="app-content app-background-color">
        <img class="app-background-logo" src="@/../assets/logo/icon-v5.png" />
    </div>
    <div class="app-content background-transparent-color">
        <NestedWidgetContainer :widgetStackingType="this.WidgetStackingType.VERTICAL" ratio="85%">
            <template #left>
                <PlayfieldArea 
                    :hitObjects="this.hitObjects" 
                    :circleSize="4" 
                    :shortcutListener="this.shortcutListener" 
                    :mouseListener="this.mouseListener" 
                    :actionHistory="this.actionHistory" 
                    :backgroundImageSrc="require('@/../assets/bg_test/sakura.jpeg')" 
                    imageBrightness="10%" 
                />
            </template>
            <template #right>
                <TimelineBar 
                    timelineCursorPosition="2500" 
                    timelineWidth="3000" 
                />
            </template>
        </NestedWidgetContainer>
    </div>
</template>

<script>
    import PlayfieldArea from '@/../src/app/ui/widget/playfield/PlayfieldArea.vue';
    import ShortcutListener from '@/../src/util/user_input/ShortcutListener.js';
    import CursorPosition from '@/../src/util/user_input/CursorPosition.js';
    import ActionHistory from '@/../src/util/action/ActionHistory.js';
    import NestedWidgetContainer from '@/../src/app/ui/widget/generic/NestedWidgetContainer.vue';
    import { WidgetStackingType } from '@/../src/app/ui/widget/generic/NestedWidgetStackingType.js';
    import Vector2 from '@/../src/util/math/vector/Vector2.js';
    import TimelineBar from '@/../src/app/ui/widget/timeline/TimelineBar.vue';

    // xav propose:
    // 
    // keybindings configs done in a config file (Z)
    // add a vue thingy for settings and configuring the keybinds (F)
    // keybinds should not be in playfield event handling layer stuff (A)
    // buttons for playfield should be in the playfield area component, not the event one (A)
    // keybinds should go in the button defs, not the event handling layer (A)
    // tool creation is probably bad, have some sort of object that contains the factories already setup, and use that instead (B)
    // timeline should only render bars that can be seen, don't add stuff in the dom that is not displayed (A)
    // 

    export default {
        name: 'App',
        components: {
            PlayfieldArea,
            NestedWidgetContainer,
            TimelineBar
        },
        data() {
            return {
                WidgetStackingType,
                hitObjects: [],
                shortcutListener: new ShortcutListener(),
                mouseListener: new CursorPosition(new Vector2(0, 0)),
                actionHistory: new ActionHistory(),
                timelinePosition: 200,
            };
        },
        created() {
            
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
        left: 50%;
        top: 50%;
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
