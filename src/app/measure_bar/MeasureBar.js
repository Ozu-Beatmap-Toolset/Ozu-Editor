const TransparencyHandler = require('../hit_objects/TransparencyHandler.js');

const MIN_TIME_DIVISION = 1;
const MAX_TIME_DIVISION = 16;

module.exports = class MeasureBar {
    start = 0;  // ms
    increments = 1; // beats
    relativePosition = 0; // beats
    bpm = 120;

    scrollTimeDivision(scrollAmount) {
        var newTimeDivision = Math.round(1/this.increments) + scrollAmount;
        if(newTimeDivision < MIN_TIME_DIVISION) {
            newTimeDivision = MIN_TIME_DIVISION;
        }
        if(newTimeDivision > MAX_TIME_DIVISION) {
            newTimeDivision = MAX_TIME_DIVISION;
        }
        this.increments = 1/newTimeDivision;

        this.snapToClosestDivision();
    }

    scrollPosition(scrollAmount) {
        this.addToRelativePosition(scrollAmount*this.increments);
    }

    step(ms) {
        const amountToMove = this.#msToAmountOfBeats(ms);
        this.addToRelativePosition(amountToMove);
    }

    addToRelativePosition(amount) {
        this.relativePosition += amount;
        const startInBeats = this.getOffsetInBeats();
        if(this.relativePosition < startInBeats) {
            this.relativePosition = startInBeats;
        }
        TransparencyHandler.updateTransparency(this.getCurrentPosition());
        console.log(this.getCurrentPosition());
    }

    snapToClosestDivision() {
        this.relativePosition = this.#snapToClosestDivision(this.relativePosition);
        TransparencyHandler.updateTransparency(this.getCurrentPosition());
        console.log(this.getCurrentPosition());
    }

    #snapToClosestDivision(value) {
        return Math.round(value/this.increments) * this.increments;
    }

    getTimeDivision() {
        return 1/this.increments;
    }

    getCurrentPosition() {
        return this.relativePosition + this.getOffsetInBeats();
    }

    getOffsetInBeats() {
        return this.#msToAmountOfBeats(this.start);
    }

    getCurrentPositionOnClosestDivision() {
        return this.#snapToClosestDivision(this.relativePosition) + this.getOffsetInBeats();
    }

    #msToAmountOfBeats(ms) {
        const minutes = ms/60000;   // ms * (1sec/1000ms) * (1min/60sec) = min
        return this.bpm * minutes;  // beats/min * min = beats
    }
};
