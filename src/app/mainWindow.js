// Modules to control application life and create native browser window
const toolbarUtils = require("../toolbar/setToolbarMenu.js");
const windowCreator = require("./createWindow.js");

function main() {
  const mainWindow = windowCreator.createWindow();
  toolbarUtils.setAppMenu(mainWindow);
  mainWindow.loadFile("index.html");
  mainWindow.webContents.openDevTools();
}

module.exports = {
  main
};
