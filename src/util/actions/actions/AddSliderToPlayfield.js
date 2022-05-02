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
    #bezierCurve;
    constructor(actionHistory, sliderToAdd, measureBar, playfield, bezierCurve) {
        super(actionHistory, () => {this.forwardAction() }, () => { this.inverseAction() });
        this.#sliderToAdd = sliderToAdd;
        this.#measureBar = measureBar;
        this.#playfield = playfield;
        this.#bezierCurve = bezierCurve;
    }

    forwardAction() {
        playfieldInserter.insert(this.#sliderToAdd);
        hitSliderUiUpdater.draw(this.#sliderToAdd, this.bezierCurve, this.#playfield);
        //transparencyHandler.updateTransparency(this.#measureBar.getCurrentPosition());
    }

    inverseAction() {
        Playfield.asDomElement().removeChild(this.#sliderToAdd);
    }
}