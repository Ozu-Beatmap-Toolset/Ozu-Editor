<template>
    <div class="app-content app-background-color">
        <img class="app-background-logo" src="@/../assets/logo/icon-v5.png" />
    </div>
    <div class="app-content background-transparent-color">
        <HorizontalWidgetContainer>
            <BaseWidget>
                <PlayfieldArea 
                    :hitObjects="this.hitObjects" 
                    :circleSize="4" 
                    :shortcutListener="this.shortcutListener" 
                    :mouseListener="this.mouseListener" 
                    :actionHistory="this.actionHistory" 
                    backgroundImageSrc="C:/Users/Plads/Documents/GitHub/Ozu-Beatmap-Toolset/editor/ozu-editor/assets/bg_test/sakura.jpeg" 
                />
            </BaseWidget>
            <VerticalWidgetContainer>
                <BaseWidget>
                    <PlayfieldArea 
                        :hitObjects="this.hitObjects" 
                        :circleSize="4" 
                        :shortcutListener="this.shortcutListener" 
                        :mouseListener="this.mouseListener" 
                        :actionHistory="this.actionHistory" 
                        backgroundImageSrc="C:/Users/Plads/Documents/GitHub/Ozu-Beatmap-Toolset/editor/ozu-editor/assets/bg_test/sakura.jpeg" 
                    />
                </BaseWidget>
                <HorizontalWidgetContainer>
                    <BaseWidget>
                        <PlayfieldArea 
                            :hitObjects="this.hitObjects" 
                            :circleSize="4" 
                            :shortcutListener="this.shortcutListener" 
                            :mouseListener="this.mouseListener" 
                            :actionHistory="this.actionHistory" 
                            backgroundImageSrc="C:/Users/Plads/Documents/GitHub/Ozu-Beatmap-Toolset/editor/ozu-editor/assets/bg_test/sakura.jpeg" 
                        />
                    </BaseWidget>
            <VerticalWidgetContainer>
                <BaseWidget>
                    <PlayfieldArea 
                        :hitObjects="this.hitObjects" 
                        :circleSize="4" 
                        :shortcutListener="this.shortcutListener" 
                        :mouseListener="this.mouseListener" 
                        :actionHistory="this.actionHistory" 
                        backgroundImageSrc="C:/Users/Plads/Documents/GitHub/Ozu-Beatmap-Toolset/editor/ozu-editor/assets/bg_test/sakura.jpeg" 
                    />
                </BaseWidget>
                <HorizontalWidgetContainer>
                    <BaseWidget>
                        <PlayfieldArea 
                            :hitObjects="this.hitObjects" 
                            :circleSize="4" 
                            :shortcutListener="this.shortcutListener" 
                            :mouseListener="this.mouseListener" 
                            :actionHistory="this.actionHistory" 
                            backgroundImageSrc="C:/Users/Plads/Documents/GitHub/Ozu-Beatmap-Toolset/editor/ozu-editor/assets/bg_test/sakura.jpeg" 
                        />
                    </BaseWidget>
                    <BaseWidget>
                        <PlayfieldArea 
                            :hitObjects="this.hitObjects" 
                            :circleSize="4" 
                            :shortcutListener="this.shortcutListener" 
                            :mouseListener="this.mouseListener" 
                            :actionHistory="this.actionHistory" 
                            backgroundImageSrc="C:/Users/Plads/Documents/GitHub/Ozu-Beatmap-Toolset/editor/ozu-editor/assets/bg_test/sakura.jpeg" 
                        />
                    </BaseWidget>
                </HorizontalWidgetContainer>
            </VerticalWidgetContainer>
                </HorizontalWidgetContainer>
            </VerticalWidgetContainer>
        </HorizontalWidgetContainer>
    </div>
</template>

<script>
    import PlayfieldArea from '@/../src/app/ui/widget/playfield/PlayfieldArea.vue';
    import ShortcutListener from '@/../src/util/user_input/ShortcutListener.js';
    import CursorPosition from '@/../src/util/user_input/CursorPosition.js';
    import ActionHistory from '@/../src/util/action/ActionHistory.js';
    import BaseWidget from '@/../src/app/ui/widget/generic/BaseWidget.vue';
    import HorizontalWidgetContainer from '@/../src/app/ui/widget/generic/HorizontalWidgetContainer.vue';
    import VerticalWidgetContainer from '@/../src/app/ui/widget/generic/VerticalWidgetContainer.vue';

    export default {
        name: 'App',
        components: {
            PlayfieldArea,
            BaseWidget,
            HorizontalWidgetContainer,
            VerticalWidgetContainer,
        },
        data() {
            return {
                hitObjects: [],
                shortcutListener: new ShortcutListener(),
                mouseListener: new CursorPosition(),
                actionHistory: new ActionHistory(),
            };
        },
        beforeUnmount() {
            this.shortcutListener.unregister();
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
