const MAX_ACTION_HISTORY_SIZE = 200;

module.exports = class ActionHistory {
    #actionList = [];
    #currentActionIndex = -1;

    addAction(action) {
        if(this.#actionList.length - this.#currentActionIndex > 1) {
            this.#actionList.length = this.#currentActionIndex + 1;
        }
        this.#actionList.push(action);
        if(this.#actionList.length > MAX_ACTION_HISTORY_SIZE) {
            this.#actionList.splice(0, 1);
        }
        this.#currentActionIndex = this.#actionList.length-1;
    }

    undo() {
        if(this.#currentActionIndex >= 0) {
            this.#actionList[this.#currentActionIndex].inverse();
            this.#currentActionIndex--;
        }
    }

    redo() {
        if(this.#currentActionIndex < this.#actionList.length-1) {
            this.#currentActionIndex++;
            this.#actionList[this.#currentActionIndex].forward();
        }
    }

    size() {
        return this.#actionList.length;
    }
}
