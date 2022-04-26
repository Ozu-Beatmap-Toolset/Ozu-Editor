const State = require('./State.js');

module.exports = class StateMachine extends State {
    #state;
    #nextState;
    #initialStartNotExecuted = true;
    constructor(initState) {
        super();
        this.#nextState = initState;
    }

    // Modified to make it compatible with events.
    // The start() method is now called as fast as possible. 
    exec(input) {
        if(this.#initialStartNotExecuted && this.#nextState != this.#state) {
            this.#nextState.start(input);
            this.#initialStartNotExecuted = false;
        }
        this.#state = this.#nextState;
        const output = this.#state.exec(input);
        this.#nextState = this.#state.next(input);
        if(this.#nextState != this.#state) {
            this.#state.stop(input);
            this.#nextState.start(input);
        }

        return output;
    }
}
