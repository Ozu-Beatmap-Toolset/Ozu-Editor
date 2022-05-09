<template>
    <div class="playfield-area"/>
    <div class="full-playfield-area" @click="playfieldClicked()"/>
</template>

<script>

export default {
    name: "PlayfieldArea",
    components: {

    },
    methods: {
        playfieldClicked() {
            console.log('playfield clicked');
        }
    }
}
</script>

<style>
.full-playfield-area {
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    position: absolute;
}

.playfield-area {
    height: 80%;
    aspect-ratio: 4/3;
    position: absolute;
    top:51.71%;
    left:50%;
    transform:translate(-50%,-50%);

    border-style: solid;
    border-radius: 0.5%;
    border-width: 2px;
    border-color: rgb(255, 255, 255);
}
</style>