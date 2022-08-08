import { appData } from "@/../src/util/globals/GlobalData.js";
import SelectTool from "./tools/SelectTool.js";
import HitobjectPlacementTool from "./tools/HitobjectPlacementTool.js";
import HitsliclePlacementTool from "./tools/HitsliclePlacementTool.js";
import HitstreamPlacementTool from "./tools/HitstreamPlacementTool.js";
import HitspinnerPlacementTool from "./tools/HitspinnerPlacementTool.js";


function changePlayfieldTool(type) {
    // safeguard to handle duplicate tool change requests
    if(appData.playfield.currentUserTool.name() === type) return;

    appData.playfield.currentUserTool.unregister();
    switch(type) {
        case 'select':
            appData.playfield.currentUserTool = new SelectTool();
            break;
        case 'hitobject':
            appData.playfield.currentUserTool = new HitobjectPlacementTool();
            break;
        case 'hitslicle':
            appData.playfield.currentUserTool = new HitsliclePlacementTool();
            break;
        case 'hitstream':
            appData.playfield.currentUserTool = new HitstreamPlacementTool();
            break;
        case 'hitspinner':
            appData.playfield.currentUserTool = new HitspinnerPlacementTool();
            break;
    }
}

function toolSelectorKeyPressed(event, globalEventHandler) {
    var type = '';
    switch(event.key) {
        case 'Escape':
            type = 'select';
            changePlayfieldTool(type);
            globalEventHandler.emit('remote-press-quick-access-buttons', type);
            break;
        case '1':
            type = 'hitobject';
            changePlayfieldTool(type);
            globalEventHandler.emit('remote-press-quick-access-buttons', type);
            break;
        case '2':
            type = 'hitslicle';
            changePlayfieldTool(type);
            globalEventHandler.emit('remote-press-quick-access-buttons', type);
            break;
        case '3':
            type = 'hitstream';
            changePlayfieldTool(type);
            globalEventHandler.emit('remote-press-quick-access-buttons', type);
            break;
        case '4':
            type = 'hitspinner';
            changePlayfieldTool(type);
            globalEventHandler.emit('remote-press-quick-access-buttons', type);
            break;
    }
}

export {
    changePlayfieldTool,
    toolSelectorKeyPressed
}