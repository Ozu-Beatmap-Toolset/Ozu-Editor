<template>
    <TimeDivisionLine 
        :strokeColor="'#5FAFFF'" 
        :position="this.position" 
        :height="'100%'"
    />
</template>

<script>
    import TimeDivisionLine from '@/../src/app/ui/widget/timeline/TimeDivisionLine.vue';

    export default {
        name: 'TimelineCursor',
        components: {
            TimeDivisionLine,
        },
        props: ['position'],
        data() {
            return {

            };
        },
    }
</script>

<style>
</style>