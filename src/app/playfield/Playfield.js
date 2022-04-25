module.exports = class Playfield {
    constructor() {

    }

    static getHitObjectsParent() {
        return document.getElementById('hit-objects-layer');
    }

    insertHitObject(hitObject) {
        const parent = Playfield.getHitObjectsParent();
        const children = parent.children;
        if(children.length == 0) {
            this.#insertSomewhere(parent, hitObject);
        } else if(this.#shouldInsertLast(children, hitObject)) {
            this.#insertLast(children, hitObject);
        } else {
            this.#insertSorted(parent, children, hitObject);
        }
    }

    static getMeasureBarPositionOfHitObject(domHitObject) {
        const valueStr = domHitObject.style.getPropertyValue('--measure-bar-position');
        return parseFloat(valueStr);
    }

    #shouldInsertLast(children, hitObject) {
        return Playfield.getMeasureBarPositionOfHitObject(children[children.length-1]) <= Playfield.getMeasureBarPositionOfHitObject(hitObject);
    }

    #insertSorted(parent, children, hitObject) {
        for(var i = 0; i < children.length; i++) {
            if(Playfield.getMeasureBarPositionOfHitObject(children[i]) >= Playfield.getMeasureBarPositionOfHitObject(hitObject)) {
                parent.insertBefore(hitObject, children[i]);
                break;
            }
        }
    }

    #insertLast(children, hitObject) {
        children[children.length-1].after(hitObject);
    }

    #insertSomewhere(parent, hitObject) {
        parent.appendChild(hitObject);
    }
}
