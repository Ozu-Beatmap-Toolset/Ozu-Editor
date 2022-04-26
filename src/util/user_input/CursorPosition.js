const Vector2 = require('../math/vector/Vector2.js');

module.exports = class CursorPosition {
    #mouseMoveListenerMethod = (event) => { this.mouseMove(event); };
    #mousePosition;

    constructor() {
        window.addEventListener('mousemove', this.#mouseMoveListenerMethod);
    }

    unregister() {
        window.removeEventListener('mousemove', this.#mouseMoveListenerMethod);
    }

    mouseMove(event) {
        this.#mousePosition = new Vector2(event.clientX, event.clientY);
    }

    get() {
        return this.#mousePosition;
    }
}
