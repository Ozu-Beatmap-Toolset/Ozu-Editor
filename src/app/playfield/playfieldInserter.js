const MeasureBarPosRet = require('../measure_bar/MeasureBarPositionRetriever.js');
const Playfield = require('./Playfield.js');

function insert(domHitObject) {
    const parent = Playfield.asDomElement();
    const children = parent.children;
    if(children.length == 0) {
        insertSomewhere(parent, domHitObject);
    } else if(shouldInsertLast(children, domHitObject)) {
        insertLast(children, domHitObject);
    } else {
        insertSorted(parent, children, domHitObject);
    }
}

function shouldInsertLast(children, hitObject) {
    return MeasureBarPosRet.getPositionOfHitObject(children[children.length-1]) <= MeasureBarPosRet.getPositionOfHitObject(hitObject);
}

function insertSorted(parent, children, hitObject) {
    for(var i = 0; i < children.length; i++) {
        if(MeasureBarPosRet.getPositionOfHitObject(children[i]) >= MeasureBarPosRet.getPositionOfHitObject(hitObject)) {
            parent.insertBefore(hitObject, children[i]);
            break;
        }
    }
}

function insertLast(children, hitObject) {
    children[children.length-1].after(hitObject);
}

function insertSomewhere(parent, hitObject) {
    parent.appendChild(hitObject);
}


module.exports = {
    insert
}
