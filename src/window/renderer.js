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

const ToolSelector = require('../app/playfield/tools/ToolSelector.js');
const PlayfieldIdleTool = require('../app/playfield/tools/IdleTool.js');
const StateMachine = require('../util/patterns/state_machine/StateMachine.js');

const ActionHistory = require('../util/actions/ActionHistory.js');


const UndoRedoHandler = require('../util/actions/UndoRedoHandler.js');
const Vector2 = require('../util/math/vector/Vector2.js');


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
});
