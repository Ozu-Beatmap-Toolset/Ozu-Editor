const {BrowserWindow} = require('electron')
const path = require('path')

function createWindow() {
  // Create the browser window.
  return new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
}

module.exports = {
  createWindow
};