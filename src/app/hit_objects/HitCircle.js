require('../playfield/Playfield.js');
const Vector2 = require('../../util/math/vector/Vector2.js');
const skinSetter = require('../skin/skinSetter.js');

module.exports = class HitCircle {
    static circleId = 1;

    static cloneAt(domCircle, playfield, positionOnMeasureBar) {
        const copy = domCircle.cloneNode(true);
        copy.classList.remove('unplaced-circle');
        copy.classList.add('placed-circle');
        copy.classList.add('hit-object');
        copy.id = (HitCircle.circleId++).toString();
        copy.style.setProperty('--measure-bar-position', positionOnMeasureBar);

        const playfieldPosX = parseFloat(copy.style.getPropertyValue('left'));
        const playfieldPosY = parseFloat(copy.style.getPropertyValue('top'));
        const playfieldPos = new Vector2(playfieldPosX, playfieldPosY);
        const osuPixel = playfield.playfieldPositionToOsuPixel(playfieldPos);
        copy.style.setProperty('--osu-pixels-x', String(osuPixel.x));
        copy.style.setProperty('--osu-pixels-y', String(osuPixel.y));
        skinSetter.updateSkinOf(copy);
        return copy;
    }
}