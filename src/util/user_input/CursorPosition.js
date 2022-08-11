export default class CursorPosition {
    mouseMoveListenerMethod = (event) => { this.mouseMove(event); };
    mousePosition;

    constructor(initialVector) {
        window.addEventListener('mousemove', this.mouseMoveListenerMethod);
        this.mousePosition = initialVector;
    }

    unregister() {
        window.removeEventListener('mousemove', this.mouseMoveListenerMethod);
    }

    mouseMove(event) {
        this.mousePosition.x = event.clientX;
        this.mousePosition.y = event.clientY;
    }

    get() {
        return this.mousePosition;
    }
}
