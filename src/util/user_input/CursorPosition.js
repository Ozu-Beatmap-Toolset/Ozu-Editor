import Vector2 from '@/../src/util/math/vector/Vector2.js';

export default class CursorPosition {
    mouseMoveListenerMethod = (event) => { this.mouseMove(event); };
    mousePosition;

    constructor() {
        window.addEventListener('mousemove', this.mouseMoveListenerMethod);
        this.mousePosition = new Vector2(0, 0);
    }

    unregister() {
        window.removeEventListener('mousemove', this.mouseMoveListenerMethod);
    }

    mouseMove(event) {
        this.mousePosition = new Vector2(event.clientX, event.clientY);
    }

    get() {
        return this.mousePosition;
    }
}
