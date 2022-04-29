const PlayfieldConstants = require('./constants.js');
const Vector2 = require('../../util/math/vector/Vector2.js');

module.exports = class Playfield {
    static asDomElement() {
        return document.getElementById('hit-objects-layer');
    }

    playfieldPositionToOsuPixel(pos) {
        const rect = this.getPlayfieldRect();
        const clientToOsu = new Vector2(
            PlayfieldConstants.sizeX/rect.width,
            PlayfieldConstants.sizeY/rect.height);
        return pos.decoupledScaled(clientToOsu).discreteForm();
    }

    osuPixelToPlayfieldPosition(px) {
        const rect = this.getPlayfieldRect();
        const osuToClient = new Vector2(
            rect.width/PlayfieldConstants.sizeX,
            rect.height/PlayfieldConstants.sizeY);
        return px.decoupledScaled(osuToClient);
    }

    snapOnOsuGrid(domElement) {
        const playfieldPosX = parseFloat(domElement.style.getPropertyValue('left'));
        const playfieldPosY = parseFloat(domElement.style.getPropertyValue('top'));
        const playfieldPos = new Vector2(playfieldPosX, playfieldPosY);
        const osuPixel = this.playfieldPositionToOsuPixel(playfieldPos);
        const snappedPlayfieldPos = this.osuPixelToPlayfieldPosition(osuPixel);
        domElement.style.setProperty('left', String(snappedPlayfieldPos.x) + 'px');
        domElement.style.setProperty('top', String(snappedPlayfieldPos.y) + 'px');
    }

    getPlayfieldRect() {
        return document.querySelector('#play-field-area').getBoundingClientRect();
    }
}
