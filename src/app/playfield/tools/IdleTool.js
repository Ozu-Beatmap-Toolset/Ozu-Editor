const BezierCurve = require('../../../util/math/curve/bezier/BezierCurve.js');
const State = require('../../../util/patterns/state_machine/State.js');
const RealtimeKB = require('../../../util/user_input/RealtimeKB.js');
const unplacedCircle = require('../../hit_objects/unplacedCircle.js');

module.exports = class IdleTool extends State {
    #uiData

    constructor(uiData) {
        super();
        this.#uiData = uiData;
    }

    next(input) {
        if (input[0][0].amountOfKeysPressed() == 1 && input[0][0].key1Pressed()) {
            const HitCirclePlacement = require('./playfield_placement/HitCirclePlacement.js');
            return new HitCirclePlacement(this.#uiData);
        }
        if(input[0][0].amountOfKeysPressed() == 1 && input[0][0].key2Pressed()) {
            const HitSliderPlacement = require('./playfield_placement/HitSliderPlacement.js');
            return new HitSliderPlacement(this.#uiData, new BezierCurve([]));
        }
        /*
        return this;
        if(input[0][0].amountOfKeysPressed() == 1 && input[0].key3Pressed()) {
            const HitSpinnerPlacement = require('./playfield_placement/HitSpinnerPlacement.js');
            return new HitSpinnerPlacement(this.#uiData);
        }*/
        return this;
    }
}