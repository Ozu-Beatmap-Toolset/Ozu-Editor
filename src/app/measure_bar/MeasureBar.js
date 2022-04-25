const TransparencyHandler = require('../hit_objects/TransparencyHandler.js');

const MIN_TIME_DIVISION = 1;
const MAX_TIME_DIVISION = 16;

module.exports = class MeasureBar {
    start = 0;
    increments = 1;
    relativePosition = 0;
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
        if(this.relativePosition < this.start) {
            this.relativePosition = this.start;
        }
    }

    step(ms) {
        const amountToMove = this.#msToAmountOfBeats(ms);
        this.addToRelativePosition(amountToMove);
    }

    addToRelativePosition(amount) {
        this.relativePosition += amount;
        TransparencyHandler.updateTransparency(this.getCurrentPosition());
    }

    snapToClosestDivision() {
        this.relativePosition = this.#snapToClosestDivision(this.relativePosition);
    }

    #snapToClosestDivision(value) {
        return Math.round(value/this.increments) * this.increments;
    }

    getTimeDivision() {
        return 1/this.increments;
    }

    getCurrentPosition() {
        return this.relativePosition + this.start;
    }

    getCurrentPositionOnClosestDivision() {
        return this.#snapToClosestDivision(this.relativePosition) + this.start;
    }

    #msToAmountOfBeats(ms) {
        const minutes = ms/60000;   // ms * (1sec/1000ms) * (1min/60sec) = min
        return this.bpm * minutes;  // beats/min * min = beats
    }
};
