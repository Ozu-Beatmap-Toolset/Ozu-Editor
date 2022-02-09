const {BrowserWindow} = require('electron')
const path = require('path')
const appVersion = require("../info/appVersion.js");
const appName = require("../info/appName.js");

function createWindow() {
  // Create the browser window.
  return new BrowserWindow({
    width: 800,
    height: 600,
    title: appName.get() + " " + appVersion.get(),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    },
  })
}

module.exports = {
  createWindow
};
