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
        props: ['toolName'],
        emits: ['set-active-tool'],
        methods: {
            buttonClick() {
                this.$emit('set-active-tool', this.toolName);
            }
        }
    }
</script>

<style>
    .quick-access-button {
        position: relative;
    }
</style>