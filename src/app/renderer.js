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
})

var x = 1;
window.addEventListener('click', (event) => {
    hitCircle = document.querySelector(".unplaced-circle");
    var dupNode = hitCircle.cloneNode(false);
    dupNode.classList.remove("unplaced-circle");
    dupNode.classList.add("placed-circle");
    dupNode.id = (x++).toString();
    document.getElementById("circle-layer").appendChild(dupNode);
})

window.addEventListener('resize', () => {
    placedCircles = document.getElementsByClassName("placed-circle");
})