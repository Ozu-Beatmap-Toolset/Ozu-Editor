import fs from 'fs';
let skinLocation;
import skinFileNameDict from './skinFileNames.json';
let skinDict = {};
let skinIni = {};

reloadSkinFolder();

function reloadSkinFolder() {
    skinLocation = require('../../../../user-prefs.json').gameData.skinLocation;
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
        for(let i = 1; i < sections.length; i++) {
            const lines = sections[i].split('\r\n');
            const header = lines[0].slice(0, -1);
            skinIni[header] = {};
            for(let j = 1; j < lines.length; j++) {
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