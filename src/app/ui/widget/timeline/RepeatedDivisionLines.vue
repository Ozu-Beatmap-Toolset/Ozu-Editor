<template>
    <div v-for="position of this.positions" :key="position.id" style="width:100%; height:100%">
        <TimeDivisionLine
            :position="position.cssPosition" 
            :height="'100%'" 
            :strokeColor="this.color"
        />
    </div>
</template>

<script>
    import TimeDivisionLine from '@/../src/app/ui/widget/timeline/TimeDivisionLine.vue';

    export default {
    name: "RepeatedDivisionLines",
    components: { 
        TimeDivisionLine,
    },
    props: ['start', 'end', 'separation', 'color'],
    data() {
        return {
            positions: [],
        };
    },
    beforeUpdate() {
        this.positions.splice(0, this.positions.length);
        let amount = (this.end - this.start) / this.separation;
        for (let i = 0; i < amount; i++) {
            this.positions.push({
                cssPosition: `${this.start + i * this.separation}px`,
                id: i,
            });
        }
    },
}
</script>

<style>

</style>