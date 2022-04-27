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
        return this;
        /*
        if(input[0].amountOfKeysPressed() == 1 && input[0].key2Pressed()) {
            const HitSlizerPlacement = require('./playfield_placement/HitSlizerPlacement.js');
            return new HitSlizerPlacement(this.#uiData);
        }
        if(input[0].amountOfKeysPressed() == 1 && input[0].key3Pressed()) {
            const HitSliclePlacement = require('./playfield_placement/HitSliclePlacement.js');
            return new HitSliclePlacement(this.#uiData);
        }
        return this;*/
    }
}