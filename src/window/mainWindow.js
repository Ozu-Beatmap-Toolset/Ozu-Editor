// Modules to control application life and create native browser window
const windowCreator = require("./createWindow.js");
const toolbarUtils = require("./toolbar/setToolbarMenu.js");

function main() {
  const mainWindow = windowCreator.createWindow();
  toolbarUtils.setAppMenu(mainWindow);
  mainWindow.loadFile("src/index.html");
  mainWindow.webContents.openDevTools();
}

module.exports = {
  main
};
