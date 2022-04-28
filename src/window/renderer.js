// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const RealtimeKB = require('../util/user_input/RealtimeKB.js');
const CursorPosition = require('../util/user_input/CursorPosition.js');

const Playfield = require("../app/playfield/Playfield.js");

const MeasureBar = require('../app/measure_bar/MeasureBar.js');
const MeasureBarScroller = require('../app/measure_bar/MeasureBarScroller.js');
const BeatmapPlayer = require('../app/beatmap_player/BeatmapPlayer.js');

const unplacedCircle = require('../app/hit_objects/unplacedCircle');

const ToolSelector = require('../app/playfield/tools/ToolSelector.js');
const PlayfieldIdleTool = require('../app/playfield/tools/IdleTool.js');
const StateMachine = require('../util/patterns/state_machine/StateMachine.js');

const hitCircleSkinSetter = require('../app/ui/hitCircleDrawer.js');
const hitSliderSkinSetter = require('../app/ui/hitSliderDrawer.js');

const ActionHistory = require('../util/actions/ActionHistory.js');


const UndoRedoHandler = require('../util/actions/UndoRedoHandler.js');

hitCircleSkinSetter.draw(unplacedCircle.getDomObject());
hitSliderSkinSetter.draw(document.querySelector('.test-slider'));

const keyLogger = new RealtimeKB();
const cursorPosition = new CursorPosition();
const actionHistory = new ActionHistory();
const undoRedoHandler = new UndoRedoHandler(actionHistory, keyLogger);

const playfield = new Playfield();
const measureBar = new MeasureBar();

const measureBarScroller = new MeasureBarScroller(measureBar, keyLogger);
const beatmapPlayer = new BeatmapPlayer(measureBar);
const toolSelector = new ToolSelector([keyLogger, cursorPosition], new StateMachine(new PlayfieldIdleTool([playfield, measureBar, actionHistory])));

window.addEventListener('resize', () => {
    placedHitObjects = document.getElementsByClassName('placed-circle');
    hitSliderSkinSetter.draw(document.querySelector('.test-slider'), playfield);
});


function updateSlider() {
    //var x1 = Date.now();
    const hitSlider = document.querySelector('.test-slider');
    controlPoints = JSON.parse(getComputedStyle(hitSlider).getPropertyValue('--control-points'));
    controlPoints[0].x = cursorPosition.get().x - parseInt(playfield.getPlayfieldRect().left);
    controlPoints[0].y = cursorPosition.get().y - parseInt(playfield.getPlayfieldRect().top);
    hitSlider.style.setProperty('--control-points', JSON.stringify(controlPoints));
    hitSliderSkinSetter.draw(document.querySelector('.test-slider'), playfield);
    //var x2 = Date.now();
    //console.log(x1 - x2);
}

window.setInterval(updateSlider, 16);
