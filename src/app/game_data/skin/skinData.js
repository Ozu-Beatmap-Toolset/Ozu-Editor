import 'fs';
var skinLocation;
import skinFileNameDict from './skinFileNames.json';
var skinDict = {};

reloadSkinFolder();

function reloadSkinFolder() {
    skinLocation = require('../../../../userPrefs.json').gameData.skinLocation;
    registerfileNames();
}

function registerfileNames() {
    for (const entries of Object.entries(skinFileNameDict)) {
        const fileName = entries[1];
        skinDict[fileName.replace('.png', '')] = skinLocation + '/' + fileName;
    }
}

export default {
    reloadSkinFolder,
    skinDict,
}