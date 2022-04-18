const actionHistory = require('./actionHistory.js');

module.exports = class Action {
    constructor(forward, inverse) {
      this.forward = forward;
      this.inverse = inverse;
    }

    do() {
      this.forward();
      actionHistory.addAction(this);
    }
}
