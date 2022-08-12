<template>
    <div v-for="position of this.positions" :key="position.id" style="width:100%; height:100;">
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
    props: ["initialPosition", "separation", "amount", "color"],
    data() {
        return {
            positions: [],
        };
    },
    mounted() {
        for (var i = 0; i < this.amount; i++) {
            this.positions.push({
                cssPosition: `calc(${this.initialPosition} + (${i} * ${this.separation}))`,
                id: i,
            });
        }
    },
}
</script>

<style>

</style>