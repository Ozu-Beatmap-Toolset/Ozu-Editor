require('../../util/user_input/RealtimeKB.js');
require('./MeasureBar.js');

module.exports = class MeasureBarScroller {
    #scrollListenerMethod = (event) => { this.#scroll(event) };
    #measureBar;
    #keyLogger;

    constructor(measureBar, keyLogger) {
        this.#measureBar = measureBar;
        this.#keyLogger = keyLogger;
        window.addEventListener('wheel', this.#scrollListenerMethod);
    }

    unregister() {
        window.removeEventListener('wheel', this.#scrollListenerMethod);
    }

    #scroll(event) {
        const scrollAmount = Math.round(event.deltaY * -0.01);    // increments are scaled by -100
        if(this.#keyLogger.leftCtrlPressed()) {
            this.#measureBar.scrollTimeDivision(scrollAmount);
            console.log(this.#measureBar.getTimeDivision());
        }
        else {
            this.#measureBar.scrollPosition(scrollAmount);
        }
    }
}
