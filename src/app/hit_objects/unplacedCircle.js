function moveTo(pos, playfield) {
    var x = pos.x;
    var y = pos.y;
    const unplacedCircle = document.querySelector(".unplaced-circle");
    const playfieldRectangle = playfield.getPlayfieldRect();
    unplacedCircle.style.position = 'absolute';
    x = clamp(x, playfieldRectangle.left, playfieldRectangle.right);
    y = clamp(y, playfieldRectangle.top, playfieldRectangle.bottom);
    x -= playfieldRectangle.left;
    y -= playfieldRectangle.top;
    unplacedCircle.style.left = `${x}px`;
    unplacedCircle.style.top = `${y}px`;
    playfield.snapOnOsuPixels(unplacedCircle);
}

function clamp(x, min, max) {
    if(x < min) {
        x = min;
    }
    else if(x > max) {
        x = max;
    }
    return x;
}

module.exports = {
    moveTo
}