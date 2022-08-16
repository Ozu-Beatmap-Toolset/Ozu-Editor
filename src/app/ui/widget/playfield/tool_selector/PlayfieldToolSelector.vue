<template>
    <table style="position:relative" v-if="require('@/../user-prefs.json')['playfieldEditor']['showLeftSideButtons']" >
        <ButtonSeparator/>

        <QuickAccessButton 
            :toolName="this.ToolType.Select"
            @set-active-tool="this.buttonPressForwarding"
        >
            <img src="@/../assets/buttons/ic_edit_24px.svg" draggable="false"/>
        </QuickAccessButton>
        <QuickAccessButton>
            <img src="@/../assets/buttons/ic_gps_fixed_24px.svg" draggable="false"/>
        </QuickAccessButton>

        <ButtonSeparator/>

        <QuickAccessButton>
            <img src="@/../assets/buttons/ic_open_with_24px.svg" draggable="false"/>
        </QuickAccessButton>
        <QuickAccessButton>
            <img src="@/../assets/buttons/ic_loop_24px.svg" draggable="false"/>
        </QuickAccessButton>
        <QuickAccessButton>
            <img src="@/../assets/buttons/ic_tab_unselected_24px.svg" draggable="false"/>
        </QuickAccessButton>

        <ButtonSeparator/>

        <QuickAccessButton 
            :toolName="this.ToolType.HitObjectPlacement"
            @set-active-tool="this.buttonPressForwarding"
        >
            <img src="@/../assets/buttons/ic_add_circle_outline_24px.svg" draggable="false"/>
        </QuickAccessButton>
        <QuickAccessButton 
            :toolName="this.ToolType.HitSliclePlacement"
            @set-active-tool="this.buttonPressForwarding"
        >
            <img src="@/../assets/buttons/ic_rotate_left_24px.svg" draggable="false"/>
        </QuickAccessButton>
        <QuickAccessButton 
            :toolName="this.ToolType.HitSpinnerPlacement"
            @set-active-tool="this.buttonPressForwarding"
        >
            <img src="@/../assets/buttons/ic_control_point_duplicate_24px.svg" draggable="false"/>
        </QuickAccessButton>
        <QuickAccessButton 
            :toolName="this.ToolType.HitStreamPlacement"
            @set-active-tool="this.buttonPressForwarding"
        >
            <img src="@/../assets/buttons/ic_settings_backup_restore_24px.svg" draggable="false"/>
        </QuickAccessButton>

        <ButtonSeparator/>

        <QuickAccessButton>
            <img src="@/../assets/buttons/ic_settings_ethernet_24px.svg" draggable="false"/>
        </QuickAccessButton>
    </table>
</template>

<script>
    import QuickAccessButton from '@/../src/app/ui/widget/playfield/tool_selector/QuickAccessButton.vue';
    import ButtonSeparator from '@/../src/app/ui/widget/playfield/tool_selector/ButtonSeparator.vue';
    import { ToolType } from '@/../src/app/ui/widget/playfield/tools/ToolTypeEnum.js';
    import { registerBindings, unregisterBindings } from '@/../src/app/ui/widget/playfield/tool_selector/playfieldKeybinds.js'

    export default {
        components: { 
            QuickAccessButton,
            ButtonSeparator
        },
        props: ['shortcutListener', 'areKeyBindingsActive'],
        emits: ['set-active-tool'],
        data() {
            return {
                ToolType: ToolType,
            };
        },
        methods: {
            buttonPressForwarding(toolName) {
                this.$emit('set-active-tool', toolName);
            },
            registerBindings() {
                registerBindings(this.shortcutListener, this);
            },
            unregisterBindings() {
                unregisterBindings(this.shortcutListener);
            },
            updateKeyBindings() {
                if(this.areKeyBindingsActive) {
                    this.registerBindings();
                }
                else {
                    this.unregisterBindings();
                }
            }
        },
        mounted() {
            this.updateKeyBindings();
        },
        beforeUpdate() {
            this.updateKeyBindings();
        }
    }
</script>

<style>

</style>