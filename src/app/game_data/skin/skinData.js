import fs from 'fs';
var skinLocation;
import skinFileNameDict from './skinFileNames.json';
var skinDict = {};
var skinIni = {};

reloadSkinFolder();

function reloadSkinFolder() {
    skinLocation = require('../../../../userPrefs.json').gameData.skinLocation;
    registerFileNames();
    reloadSkinIni();
}

function registerFileNames() {
    for (const entries of Object.entries(skinFileNameDict)) {
        const fileName = entries[1];
        skinDict[fileName.replace('.png', '')] = skinLocation + '/' + fileName;
    }
    skinDict['skin'] = skinLocation + '/skin.ini';
}

function reloadSkinIni() {
    skinIni = {};
    if(fs.existsSync(skinDict['skin'])) {
        const sections = fs.readFileSync(skinDict['skin'], 'utf-8').split('[');
        for(var i = 1; i < sections.length; i++) {
            const lines = sections[i].split('\r\n');
            const header = lines[0].slice(0, -1);
            skinIni[header] = {};
            for(var j = 1; j < lines.length; j++) {
                const content = lines[j].split(':');
                if(content.length < 2) continue;
                skinIni[header][content[0]] = content[1].replace(' ', '');
            }
        }
    }

}

export const skin = {
    dict: skinDict,
    ini: skinIni,
    reload: reloadSkinFolder,
}