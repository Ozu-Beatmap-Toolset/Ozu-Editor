require('./ActionHistory.js');

module.exports = class Action {
    constructor(actionHistory, forward, inverse) {
        this.actionHistory = actionHistory;
        this.forward = forward;
        this.inverse = inverse;
    }

    do() {
        this.forward();
        this.actionHistory.addAction(this);
    }
}
