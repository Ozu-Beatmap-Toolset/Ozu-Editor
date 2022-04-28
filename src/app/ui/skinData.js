const fs = require("fs");
var skinLocation;
var skinFileNameDict = require('./skinFileNames.json');
var skinDict = {};

reloadSkinFolder();

function reloadSkinFolder() {
    skinLocation = require('../../../userPrefs.json').gameData.skinLocation;
    registerfileNames();
}

function registerfileNames() {
    for (const entries of Object.entries(skinFileNameDict)) {
        const fileName = entries[1];
        skinDict[fileName.replace('.png', '')] = skinLocation + '/' + fileName;
    }
}

module.exports = {
    reloadSkinFolder,
    skinDict,
}