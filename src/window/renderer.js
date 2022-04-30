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

const hitCircleUiUpdater = require('../app/ui/hitCircleUiUpdater.js');
const hitSliderSkinSetter = require('../app/ui/hitSliderUiUpdater.js');

const ActionHistory = require('../util/actions/ActionHistory.js');


const UndoRedoHandler = require('../util/actions/UndoRedoHandler.js');
const Vector2 = require('../util/math/vector/Vector2.js');


const keyLogger = new RealtimeKB();
const cursorPosition = new CursorPosition();
const actionHistory = new ActionHistory();
const undoRedoHandler = new UndoRedoHandler(actionHistory, keyLogger);

const playfield = new Playfield();
const measureBar = new MeasureBar();

hitCircleUiUpdater.draw(unplacedCircle.getDomObject());
hitSliderSkinSetter.draw(document.querySelector('.unplaced-slider'), playfield);

const measureBarScroller = new MeasureBarScroller(measureBar, keyLogger);
const beatmapPlayer = new BeatmapPlayer(measureBar);
const toolSelector = new ToolSelector([keyLogger, cursorPosition], new StateMachine(new PlayfieldIdleTool([playfield, measureBar, actionHistory])));

window.addEventListener('resize', () => {
    placedHitObjects = document.getElementsByClassName('placed-circle');
});

function updateSlider() {
    const hitSlider = document.querySelector('.unplaced-slider');
    controlPoints = JSON.parse(getComputedStyle(hitSlider).getPropertyValue('--control-points'));
    const topLeftPlayfield = new Vector2(playfield.getPlayfieldRect().left, playfield.getPlayfieldRect().top);
    const cursorOnOsuGrid = playfield.playfieldPositionToOsuPixel(cursorPosition.get().minus(topLeftPlayfield));
    controlPoints[controlPoints.length-1].x = cursorOnOsuGrid.x;
    controlPoints[controlPoints.length-1].y = cursorOnOsuGrid.y;
    hitSlider.style.setProperty('--control-points', JSON.stringify(controlPoints));

    hitSliderSkinSetter.draw(document.querySelector('.unplaced-slider'), playfield);
}

//window.setInterval(updateSlider, 16);
