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

const playfieldInserter = require("../app/playfield/playfieldInserter.js");

const HitCircle = require('../app/hit_objects/HitCircle.js');

window.addEventListener('mousemove', (event) => {
    var x = event.clientX;
    var y = event.clientY;
    var unplacedCircle = document.querySelector(".unplaced-circle");
    var playfieldRectangle = playfield.getPlayfieldRect();
    unplacedCircle.style.position = 'absolute';
    if(x < playfieldRectangle.left) {
        x = playfieldRectangle.left;
    }
    else if(x > playfieldRectangle.right) {
        x = playfieldRectangle.right;
    }
    if(y < playfieldRectangle.top) {
        y = playfieldRectangle.top;
    }
    else if(y > playfieldRectangle.bottom) {
        y = playfieldRectangle.bottom;
    }
    x -= playfieldRectangle.left;
    y -= playfieldRectangle.top;
    unplacedCircle.style.left = `${x}px`;
    unplacedCircle.style.top = `${y}px`;
    playfield.snapOnOsuPixels(unplacedCircle);
});

window.addEventListener('click', (event) => {
    unplacedCircle = document.querySelector('.unplaced-circle');
    const hitCircleCopy = HitCircle.cloneAt(unplacedCircle, playfield, measureBar.getCurrentPositionOnClosestDivision());
    playfieldInserter.insert(hitCircleCopy);
});

window.addEventListener('resize', () => {
    placedCircles = document.getElementsByClassName('placed-circle');
});

window.addEventListener('wheel', (event) => {
    const scrollAmount = Math.round(event.deltaY * -0.01);    // increments are scaled by -100
    if(keyLogger.leftCtrlPressed()) {
        measureBar.scrollTimeDivision(scrollAmount);
        console.log(measureBar.getTimeDivision());
    }
    else {
        measureBar.scrollPosition(scrollAmount);
    }
});
