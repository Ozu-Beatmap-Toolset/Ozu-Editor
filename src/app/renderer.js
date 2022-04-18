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
