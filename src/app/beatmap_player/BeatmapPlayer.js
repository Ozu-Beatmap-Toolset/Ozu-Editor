const EdgeDetector = require('../../util/signal/EdgeDetector.js');

module.exports = class BeatmapPlayer {
    lastExecutionTime = Date.now();
    isPlaying = false;
    #refreshTime = 16; // ms
    #timerReference = undefined; // needed to clear the interval timer
    #edgeDetector = new EdgeDetector(false);
    #keydownListenerMethod = (event) => { this.#keyPressed(event) };
    #keyupListenerMethod = (event) => { this.#keyReleased(event) };
    #measureBar;

    constructor(measureBar) {
        this.#measureBar = measureBar;
        window.addEventListener('keydown', this.#keydownListenerMethod);
        window.addEventListener('keyup', this.#keyupListenerMethod);
    }

    unregister() {
        window.removeEventListener('keydown', this.#keydownListenerMethod);
        window.removeEventListener('keyup', this.#keyupListenerMethod);
    }

    #keyPressed(event) {
        if(event.code === 'Space')
        {
            this.userToggledPlay(this.#measureBar);
        }
    }

    #keyReleased(event) {
        if(event.code === 'Space')
        {
            this.userReleasedPlay();
        }
    }

    step(measureBar) {
        const currentTime = Date.now();
        measureBar.step(currentTime - this.lastExecutionTime);
        this.lastExecutionTime = Date.now();
    }

    userToggledPlay(measureBar) {
        // make sure we're handling on a rising/falling edge
        this.#edgeDetector.set(true);
        if(this.#edgeDetector.isUnchanged()) return;

        this.isPlaying = !this.isPlaying;
        this.lastExecutionTime = Date.now();  // reset to prevent unwanted big jumps

        this.#toggleIntervalAssignation(measureBar);
    }

    userReleasedPlay() {
        // reset when user releases
        this.#edgeDetector.set(false);
    }

    #toggleIntervalAssignation(measureBar) {
        if(this.isPlaying) {
            this.#timerReference = window.setInterval(() => { this.step(measureBar); }, this.#refreshTime);
        } else {
            window.clearInterval(this.#timerReference);
            this.#timerReference = undefined;
            measureBar.snapToClosestDivision();
        }
    }
}
