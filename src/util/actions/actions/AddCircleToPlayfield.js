const Action = require('../Action.js');
require('../ActionHistory.js');
const playfieldInserter = require('../../../app/playfield/playfieldInserter.js');
const Playfield = require('../../../app/playfield/Playfield.js');
const transparencyHandler = require('../../../app/hit_objects/TransparencyHandler.js');
require('../../../app/measure_bar/MeasureBar.js');

module.exports = class AddCircleToPlayfield extends Action {
    #circleToAdd;
    #measureBar;
    constructor(actionHistory, circleToAdd, measureBar) {
        super(actionHistory, () => {this.forwardAction() }, () => { this.inverseAction() });
        this.#circleToAdd = circleToAdd;
        this.#measureBar = measureBar;
    }

    forwardAction() {
        playfieldInserter.insert(this.#circleToAdd);
        transparencyHandler.updateTransparency(this.#measureBar.getCurrentPosition());
    }

    inverseAction() {
        Playfield.asDomElement().removeChild(this.#circleToAdd);
    }
}