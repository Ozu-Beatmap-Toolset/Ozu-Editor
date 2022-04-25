// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

//
const { ipcRenderer } = require('electron');
ipcRenderer.send('action-signal', ['testAction']);
ipcRenderer.send('action-signal', ['testAction']);

const RealtimeKB = require('../util/keyboard/RealtimeKB.js');
const keyLogger = new RealtimeKB();

const MeasureBar = require('../app/measure_bar/MeasureBar.js');
const measureBar = new MeasureBar();

const BeatmapPlayer = require('../app/beatmap_player/BeatmapPlayer.js')
const beatmapPlayer = new BeatmapPlayer(measureBar);

const Playfield = require("../app/playfield/Playfield.js");
const playfield = new Playfield();

const HitCircle = require('../app/hit_objects/HitCircle.js');

window.addEventListener('mousemove', (event) => {
    var x = event.clientX;
    var y = event.clientY;
    var ball = document.querySelector(".unplaced-circle");
    var rect = document.querySelector('#play-field-area').getBoundingClientRect();
    ball.style.position = 'absolute';
    if(x < rect.left) {
        x = rect.left;
    }
    else if(x > rect.right) {
        x = rect.right;
    }
    if(y < rect.top) {
        y = rect.top;
    }
    else if(y > rect.bottom) {
        y = rect.bottom;
    }
    ball.style.left = `${x}px`;
    ball.style.top = `${y}px`;
});

window.addEventListener('click', (event) => {
    unplacedCircle = document.querySelector('.unplaced-circle');
    const hitCircleCopy = HitCircle.cloneAt(unplacedCircle, measureBar.getCurrentPositionOnClosestDivision());
    playfield.insertHitObject(hitCircleCopy);
});

window.addEventListener('resize', () => {
    placedCircles = document.getElementsByClassName('placed-circle');
});

window.addEventListener('wheel', (event) => {
    const scrollAmount = Math.round(event.deltaY * -0.01);    // increments are scaled by -100
    if(keyLogger.leftCtrlPressed()) {
        measureBar.scrollTimeDivision(scrollAmount);
    }
    else {
        measureBar.scrollPosition(scrollAmount);
    }
    console.log(measureBar.getCurrentPosition());
});
