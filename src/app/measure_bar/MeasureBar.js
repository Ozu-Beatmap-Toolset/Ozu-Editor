const MIN_TIME_DIVISION = 1;
const MAX_TIME_DIVISION = 16;

module.exports = class MeasureBar {
    start = 0;
    increments = 1;
    relativePosition = 0;

    scrollTimeDivision(scrollAmount) {
        var newTimeDivision = 1/this.increments + scrollAmount
        if(newTimeDivision < MIN_TIME_DIVISION) {
            newTimeDivision = MIN_TIME_DIVISION;
        }
        if(newTimeDivision > MAX_TIME_DIVISION) {
            newTimeDivision = MAX_TIME_DIVISION;
        }
        this.increments = 1/newTimeDivision;

        // snapping the position on a time division
        this.relativePosition = parseInt(this.relativePosition/this.increments) * this.increments;
    }

    scrollPosition(scrollAmount) {
        this.relativePosition += scrollAmount * this.increments;
        if(this.relativePosition < this.start) {
            this.relativePosition = this.start;
        }
    }

    getTimeDivision() {
        return 1/this.increments;
    }

    getCurrentPosition() {
        return this.relativePosition + this.start;
    }
};
