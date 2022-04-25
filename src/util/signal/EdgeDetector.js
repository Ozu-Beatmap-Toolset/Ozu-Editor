module.exports = class EdgeDetector {
    #previousValue = undefined;
    #isOnEdge = false;

    constructor(initialValue) {
        this.#previousValue = initialValue;
    }

    set(newValue) {
        this.#isOnEdge = this.#previousValue !== newValue
        this.#previousValue = newValue;
    }

    isOnEdge() {
        return this.#isOnEdge;
    }

    isUnchanged() {
        return !this.#isOnEdge;
    }
}
