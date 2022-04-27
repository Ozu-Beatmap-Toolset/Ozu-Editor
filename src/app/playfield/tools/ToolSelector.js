const StateMachine = require('../../../util/patterns/state_machine/StateMachine.js');

module.exports = class ToolSelector {
    #selectorMachine;
    #userInput;
    #keydownListenerMethod = (event) => { this.keyPressed(event); };
    #mouseDownListenerMethod = (event) => { this.mousePressed(event); };

    constructor(userInput, stateMachine) {
        // uiData is [playfield, measureBar, actionHistory]
        // new StateMachine(new IdleTool(uiData));
        this.#selectorMachine = stateMachine;
        this.#userInput = userInput;
        window.addEventListener('keydown', this.#keydownListenerMethod);
        window.addEventListener('mousedown', this.#mouseDownListenerMethod);
    }

    unregister() {
        window.removeEventListener('keydown', this.#keydownListenerMethod);
        window.removeEventListener('mousedown', this.#mouseDownListenerMethod);
    }

    // input is [[RealtimeKB, cursorPosition], Event]
    keyPressed(event) {
        this.#selectorMachine.exec([this.#userInput, event]);
    }

    mousePressed(event) {
        this.#selectorMachine.exec([this.#userInput, event]);
    }
}
