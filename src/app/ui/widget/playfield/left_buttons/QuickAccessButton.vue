<template>
    <tr>
        <button class="quick-access-button" type="button" ref="button" @click="this.buttonClick()">
            <slot> 
                {{ this.toolName }}
            </slot>
        </button>
    </tr>
</template>

<script>
    export default {
        name: "QuickAccessButton",
        props: [
            "toolName",
        ],
        methods: {
            buttonClick() {
                this.events.emit('set-active-tool', this.toolName);
            }
        }
    }
</script>

<style>
    .quick-access-button {
        position: relative;
    }
</style>