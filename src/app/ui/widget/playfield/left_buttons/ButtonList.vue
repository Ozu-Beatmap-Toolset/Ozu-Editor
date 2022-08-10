<template>
    <table style="position:absolute">
        <ButtonSeparator/>

        <QuickAccessButton :toolName="this.ToolType.Select">
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

        <QuickAccessButton :toolName="this.ToolType.HitObjectPlacement">
            <img src="@/../assets/buttons/ic_add_circle_outline_24px.svg" draggable="false"/>
        </QuickAccessButton>
        <QuickAccessButton :toolName="this.ToolType.HitSliclePlacement">
            <img src="@/../assets/buttons/ic_rotate_left_24px.svg" draggable="false"/>
        </QuickAccessButton>
        <QuickAccessButton :toolName="this.ToolType.HitSpinnerPlacement">
            <img src="@/../assets/buttons/ic_control_point_duplicate_24px.svg" draggable="false"/>
        </QuickAccessButton>
        <QuickAccessButton :toolName="this.ToolType.HitStreamPlacement">
            <img src="@/../assets/buttons/ic_settings_backup_restore_24px.svg" draggable="false"/>
        </QuickAccessButton>

        <ButtonSeparator/>

        <QuickAccessButton>
            <img src="@/../assets/buttons/ic_settings_ethernet_24px.svg" draggable="false"/>
        </QuickAccessButton>
    </table>
</template>

<script>
    import QuickAccessButton from '@/../src/app/ui/widget/playfield/left_buttons/QuickAccessButton.vue';
    import ButtonSeparator from '@/../src/app/ui/widget/playfield/left_buttons/ButtonSeparator.vue';
    import { ToolType } from '@/../src/app/ui/widget/playfield/tools/ToolTypeEnum.js';
    export default {
        components: { 
            QuickAccessButton,
            ButtonSeparator
        },
        data() {
            return {
                ToolType: ToolType,
            };
        },
    }
</script>

<style>

</style>