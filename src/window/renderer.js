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

const RealtimeKB = require("../util/keyboard/RealtimeKB.js");
var keyLogger = new RealtimeKB();

const MeasureBar = require("../app/measure_bar/MeasureBar.js");
var measureBar = new MeasureBar();

const Playfield = require("../app/playfield/Playfield.js");
var playfield = new Playfield();
playfield.appendToDOM(document);

window.addEventListener('mousemove', (event) => {
    var x = event.clientX;
    var y = event.clientY;
    var ball = document.querySelector(".unplaced-circle");
    var rect = document.querySelector('#play-field-area').getBoundingClientRect();
    ball.style.position = "absolute";
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

var x = 1;
window.addEventListener('click', (event) => {
    var x = event.clientX;
    var y = event.clientY;
    hitCircle = document.querySelector(".unplaced-circle");
    var hitCircleCopy = hitCircle.cloneNode(false);
    hitCircleCopy.classList.remove("unplaced-circle");
    hitCircleCopy.classList.add("placed-circle");
    hitCircleCopy.id = (x++).toString();
    document.getElementById("circle-layer").appendChild(hitCircleCopy);
});

window.addEventListener('resize', () => {
    placedCircles = document.getElementsByClassName("placed-circle");
});

window.addEventListener('wheel', (event) => {
    const scrollAmount = event.deltaY * -0.01;    // -100 increments, wtf
    if(keyLogger.leftCtrlPressed()) {
        measureBar.scrollTimeDivision(scrollAmount);
    }
    else {
        measureBar.scrollPosition(scrollAmount);
    }
    console.log(measureBar.getCurrentPosition());
});

window.addEventListener('keydown', (event) => {
    keyLogger.log(event);
});
window.addEventListener('keyup', (event) => {
    keyLogger.delog(event);
});
window.addEventListener('blur', (event) => {
    keyLogger.reset(event);
});
