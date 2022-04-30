const Action = require('../Action.js');
require('../ActionHistory.js');
const playfieldInserter = require('../../../app/playfield/playfieldInserter.js');
const Playfield = require('../../../app/playfield/Playfield.js');
const transparencyHandler = require('../../../app/hit_objects/TransparencyHandler.js');
require('../../../app/measure_bar/MeasureBar.js');
const hitSliderUiUpdater = require('../../../app/ui/hitSliderUiUpdater.js');

module.exports = class AddCircleToPlayfield extends Action {
    #sliderToAdd;
    #measureBar;
    #playfield;
    constructor(actionHistory, sliderToAdd, measureBar, playfield) {
        super(actionHistory, () => {this.forwardAction() }, () => { this.inverseAction() });
        this.#sliderToAdd = sliderToAdd;
        this.#measureBar = measureBar;
        this.#playfield = playfield;
    }

    forwardAction() {
        playfieldInserter.insert(this.#sliderToAdd);
        hitSliderUiUpdater.draw(this.#sliderToAdd, this.#playfield);
        //transparencyHandler.updateTransparency(this.#measureBar.getCurrentPosition());
    }

    inverseAction() {
        Playfield.asDomElement().removeChild(this.#sliderToAdd);
    }
}