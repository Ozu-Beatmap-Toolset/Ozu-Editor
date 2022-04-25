module.exports = class Playfield {
    constructor() {

    }

    getHitObjectsParent() {
        return document.getElementById('hit-objects-layer');
    }

    insertHitObject(hitObject) {
        const parent = this.getHitObjectsParent();
        const children = parent.children;
        if(children.length == 0) {
            this.#insertSomewhere(parent, hitObject);
        } else if(this.#shouldInsertLast(children, hitObject)) {
            this.#insertLast(children, hitObject);
        } else {
            this.#insertSorted(parent, children, hitObject);
        }
    }

    #getMeasureBarPositionOf(domElement) {
        const valueStr = domElement.style.getPropertyValue('--measure-bar-position');
        return parseFloat(valueStr);
    }

    #shouldInsertLast(children, hitObject) {
        return this.#getMeasureBarPositionOf(children[children.length-1]) <= this.#getMeasureBarPositionOf(hitObject);
    }

    #insertSorted(parent, children, hitObject) {
        for(var i = 0; i < children.length; i++) {
            if(this.#getMeasureBarPositionOf(children[i]) >= this.#getMeasureBarPositionOf(hitObject)) {
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
