const fs = require("fs");
var skinLocation;
var skinDict = {};

reloadSkinFolder();

function reloadSkinFolder() {
    skinLocation = require('../../../userPrefs.json').skinLocation;
    registerfileNamesFrom('./src/app/skin/skinInterfaceContent.html');
    registerfileNamesFrom('./src/app/skin/skinOsuContent.html');
}

function registerfileNamesFrom(htmlDataFileName) {
    const regexPng = new RegExp('<p class="osu-md__paragraph"><code>(.+\.png)</code></p>', 'g');
    const fileContent = fs.readFileSync(htmlDataFileName, 'utf-8');
    const fileNameMatches = fileContent.matchAll(regexPng);

    for (const match of fileNameMatches) {
        const fileName = match[1];
        skinDict[fileName.replace('.png', '')] = skinLocation + '/' + fileName;
    }
}

module.exports = {
    reloadSkinFolder,
    skinDict,
}