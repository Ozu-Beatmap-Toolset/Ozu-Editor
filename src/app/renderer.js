// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

// mouse observer thigny
var mouseObserver = require("./src/info/mouse/mouseEventObserver.js")

mouseFunction = mouseCoordinates => {
  console.log(mouseCoordinates.x + " : " + mouseCoordinates.y);
};

mouseObserver.subscribe(mouseFunction);


// buttons yeay!
document.getElementById("hitobjectButton").onclick = () => {
  console.log('hitObject!');
};

document.getElementById("hitsoundButton").onclick = () => {
  console.log('hitSound!');
};

document.getElementById("colorButton").onclick = () => {
  console.log('color!');
};

document.getElementById("storyboardButton").onclick = () => {
  console.log('storyBoard!');
};
