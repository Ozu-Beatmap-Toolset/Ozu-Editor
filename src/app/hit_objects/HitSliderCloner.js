require('../playfield/Playfield.js');
const Vector2 = require('../../util/math/vector/Vector2.js');
const ClonerIdHolder = require('./ClonerIdHolder.js');
const hitSliderUiUpdater = require('../ui/hitSliderUiUpdater.js');

module.exports = class HitSlider {
    static cloneAt(domSlider, playfield, positionOnMeasureBar) {
        const copy = domSlider.cloneNode(true);
        copy.classList.remove('unplaced-slider');
        copy.classList.add('placed-slider');
        copy.classList.add('hit-object');
        copy.id = (ClonerIdHolder.id++).toString();
        copy.style.setProperty('--measure-bar-position', positionOnMeasureBar);
        copy.style.setProperty("--control-points", getComputedStyle(domSlider).getPropertyValue("--control-points"));
        copy.style.setProperty("--bezier-length", getComputedStyle(domSlider).getPropertyValue("--bezier-length"));
        return copy;
    }
}
