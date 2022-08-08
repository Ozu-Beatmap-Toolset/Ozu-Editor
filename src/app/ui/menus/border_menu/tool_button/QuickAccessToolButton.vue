<template>
    <table>
        <tr>
            <button id='quickAccessSelectButton' class="quick-access-tool-button" @click="selectToolClicked()" ref="select-tool-button" style="background-color:rgb(0, 162, 255); pointer-events: none;">
                <img src="@/../assets/buttons/ic_edit_24px.svg"/>
            </button>
        </tr>
        <tr>
            <button id='quickAccessOriginButton' class="quick-access-tool-button" @click="onOriginToolClicked()" ref="origin-tool-button">
                <img src="@/../assets/buttons/ic_gps_fixed_24px.svg" draggable="false"/>
                
            </button>
        </tr>
        <tr>
        </tr>
        <tr>
        </tr>
        <tr>
        </tr>
        <tr>
        </tr>
        <tr>
        </tr>
        <tr>
        </tr>
        <tr>
        </tr>
        <tr>
            <button id='quickAccessMoveButton' class="quick-access-tool-button" @click="onMoveToolClicked()" ref="move-tool-button">
                <img src="@/../assets/buttons/ic_open_with_24px.svg" draggable="false"/>
            </button>
        </tr>
        <tr>
            <button id='quickAccessRotateButton' class="quick-access-tool-button" @click="onRotateToolClicked()" ref="rotate-tool-button">
                <img src="@/../assets/buttons/ic_loop_24px.svg" draggable="false"/>
            </button>
        </tr>
        <tr>
            <button id='quickAccessScaleButton' class="quick-access-tool-button" @click="onScaleToolClicked()" ref="scale-tool-button">
                <img src="@/../assets/buttons/ic_tab_unselected_24px.svg" draggable="false"/>
            </button>
        </tr>
        <tr>
        </tr>
        <tr>
        </tr>
        <tr>
        </tr>
        <tr>
        </tr>
        <tr>
        </tr>
        <tr>
        </tr>
        <tr>
        </tr>
        <tr>
            <button id='quickAccessHitobjectButton' class="quick-access-tool-button" @click="onHitobjectToolClicked()" ref="hitobject-tool-button">
                <img src="@/../assets/buttons/ic_add_circle_outline_24px.svg" draggable="false"/>
            </button>
        </tr>
        <tr>
            <button id='quickAccessHitslicleButton' class="quick-access-tool-button" @click="onHitslicleToolClicked()" ref="hitslicle-tool-button">
                <img src="@/../assets/buttons/ic_rotate_left_24px.svg" draggable="false"/>
            </button>
        </tr>
        <tr>
            <button id='quickAccessHitstreamButton' class="quick-access-tool-button" @click="onHitstreamToolClicked()" ref="hitstream-tool-button">
                <img src="@/../assets/buttons/ic_control_point_duplicate_24px.svg" draggable="false"/>
            </button>
        </tr>
        <tr>
            <button id='quickAccessHitspinnerButton' class="quick-access-tool-button" @click="onHitspinnerToolClicked()" ref="hitspinner-tool-button">
                <img src="@/../assets/buttons/ic_settings_backup_restore_24px.svg" draggable="false"/>
            </button>
        </tr>
        <tr>
        </tr>
        <tr>
        </tr>
        <tr>
        </tr>
        <tr>
        </tr>
        <tr>
        </tr>
        <tr>
        </tr>
        <tr>
        </tr>
        <tr>
            <button id='quickAccessMeasureButton' class="quick-access-tool-button" @click="onMeasureToolClicked()" ref="measure-tool-button">
                <img src="@/../assets/buttons/ic_settings_ethernet_24px.svg"/>
            </button>
        </tr>
    </table>
</template>

<script>


export default {
    name: "QuickAccessButton",
    created() {
        this.events.on('remote-press-quick-access-buttons', this.remotePressButtons);
    },
    beforeUnmount() {
        this.events.off('remote-press-quick-access-buttons', this.remotePressButtons);
    },
    methods: {
        remotePressButtons(type) {
            const refName = type + '-tool-button';
            const ref = this.$refs[refName];
            // don't set anything if the type does not correspond to a button
            if(typeof ref === 'undefined') return;
            this.setColorOf(this.$refs[refName]);
        },
        selectToolClicked() {
            this.events.emit('set-active-tool', 'select');
            this.setColorOf(this.$refs['select-tool-button']);
        },
        onOriginToolClicked() {
            this.events.emit('set-active-tool', 'origin');
            this.setColorOf(this.$refs['origin-tool-button']);
        },
        onMoveToolClicked() {
            this.events.emit('set-active-tool', 'move');
            this.setColorOf(this.$refs['move-tool-button']);
        },
        onRotateToolClicked() {
            this.events.emit('set-active-tool', 'rotate');
            this.setColorOf(this.$refs['rotate-tool-button']);
        },
        onScaleToolClicked() {
            this.events.emit('set-active-tool', 'scale');
            this.setColorOf(this.$refs['scale-tool-button']);
        },
        onHitobjectToolClicked() {
            this.events.emit('set-active-tool', 'hitobject');
            this.setColorOf(this.$refs['hitobject-tool-button']);
        },
        onHitslicleToolClicked() {
            this.events.emit('set-active-tool', 'hitslicle');
            this.setColorOf(this.$refs['hitslicle-tool-button']);
        },
        onHitstreamToolClicked() {
            this.events.emit('set-active-tool', 'hitstream');
            this.setColorOf(this.$refs['hitstream-tool-button']);
        },
        onHitspinnerToolClicked() {
            this.events.emit('set-active-tool', 'hitspinner');
            this.setColorOf(this.$refs['hitspinner-tool-button']);
        },
        onMeasureToolClicked() {
            this.events.emit('set-active-tool', 'measure');
            this.setColorOf(this.$refs['measure-tool-button']);
        },
        setColorOf(ref) {
            this.clearColors();
            ref.style['background-color'] = this.getSelectedColor();
            ref.style['pointer-events'] = 'none';
        },
        clearColors() {
            this.setAll('background-color', '');
            this.setAll('pointer-events', '');
            this.setAll('border-radius', '5px');
        },
        setAll(styleAttribute, value) {
            this.$refs['select-tool-button'].style[styleAttribute] = value;
            this.$refs['origin-tool-button'].style[styleAttribute] = value;
            this.$refs['move-tool-button'].style[styleAttribute] = value;
            this.$refs['rotate-tool-button'].style[styleAttribute] = value;
            this.$refs['scale-tool-button'].style[styleAttribute] = value;
            this.$refs['hitobject-tool-button'].style[styleAttribute] = value;
            this.$refs['hitslicle-tool-button'].style[styleAttribute] = value;
            this.$refs['hitstream-tool-button'].style[styleAttribute] = value;
            this.$refs['hitspinner-tool-button'].style[styleAttribute] = value;
            this.$refs['measure-tool-button'].style[styleAttribute] = value;
        },
        getSelectedColor() {
            return 'rgb(0, 162, 255)';
        },
    },
}
</script>

<style>
.quick-access-tool-button {
    border-radius:5px;
}

.unused-for-color-picker-access {
    color: rgb(0, 162, 255);
}
</style>