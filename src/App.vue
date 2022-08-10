<template>
    <div class="app-background-color"/>
    <img class="background-logo" src="@/../assets/logo/icon-v5.png" />
    <BaseWidget>
        <PlayfieldArea 
            :hitObjects="this.hitObjects" 
            :shortcutListener="this.shortcutListener" 
            :circleSize="4" 
            backgroundImageSrc="C:/Users/Plads/Documents/GitHub/Ozu-Beatmap-Toolset/editor/ozu-editor/assets/bg_test/sakura.jpeg" 
        />
    </BaseWidget>
</template>

<script>
    import PlayfieldArea from '@/../src/app/ui/widget/playfield/PlayfieldArea.vue';
    import ShortcutListener from '@/../src/util/user_input/ShortcutListener.js';
    import BaseWidget from '@/../src/app/ui/widget/generic/BaseWidget.vue';

    export default {
        name: 'App',
        components: {
            PlayfieldArea,
            BaseWidget
        },
        data() {
            return {
                hitObjects: [],
                shortcutListener: new ShortcutListener(),
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
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0%;
        top: 0%;
        background-color: #333;
    }
    .background-logo {
        position: absolute;
        width: 250px;
        height: 250px;
        left: 50%;
        top: 50%;
        filter: grayscale(1) opacity(0.25) contrast(0.9);
        transform: translate(-50%, -50%);
        -webkit-user-drag: none;
    }
</style>
