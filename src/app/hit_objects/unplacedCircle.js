require('../playfield/Playfield.js');
const clamp = require('../../util/math/common_function/clamp.js');

function moveTo(pos, playfield) {
    var x = pos.x;
    var y = pos.y;
    const unplacedCircle = getDomObject();
    const playfieldRectangle = playfield.getPlayfieldRect();
    unplacedCircle.style.position = 'absolute';
    x = clamp.apply(x, playfieldRectangle.left, playfieldRectangle.right);
    y = clamp.apply(y, playfieldRectangle.top, playfieldRectangle.bottom);
    x -= playfieldRectangle.left;
    y -= playfieldRectangle.top;
    unplacedCircle.style.left = `${x}px`;
    unplacedCircle.style.top = `${y}px`;
    playfield.snapOnOsuGrid(unplacedCircle);
}

function getDomObject() {
    return document.querySelector('.unplaced-circle');
}

module.exports = {
    moveTo,
    getDomObject
}
