require('../user_input/RealtimeKB.js');
require('../actions/ActionHistory.js');

module.exports = class UndoRedoHandler {
    #actionHistory;
    #keyboardListener;
    #keydownListenerMethod = (event) => { this.#keyPressed(event); };

    constructor(actionHistory, keyboardListener) {
        this.#actionHistory = actionHistory;
        this.#keyboardListener = keyboardListener;
        window.addEventListener('keydown', this.#keydownListenerMethod);
    }

    unregister() {
        window.removeEventListener('keydown', this.#keydownListenerMethod);
    }
    
    #keyPressed(event) {
        if(((this.#keyboardListener.leftCtrlPressed() || this.#keyboardListener.rightCtrlPressed())
                && this.#keyboardListener.zPressed() 
                && this.#keyboardListener.amountOfKeysPressed() == 2)
                || (this.#keyboardListener.leftCtrlPressed() 
                && this.#keyboardListener.rightCtrlPressed()
                && this.#keyboardListener.zPressed()
                && this.#keyboardListener.amountOfKeysPressed() == 3)) {
            this.#actionHistory.undo();
        } else if(((this.#keyboardListener.leftCtrlPressed() || this.#keyboardListener.rightCtrlPressed())
                && this.#keyboardListener.yPressed() 
                && this.#keyboardListener.amountOfKeysPressed() == 2)
                || (this.#keyboardListener.leftCtrlPressed() 
                && this.#keyboardListener.rightCtrlPressed()
                && this.#keyboardListener.yPressed()
                && this.#keyboardListener.amountOfKeysPressed() == 3)) {
            this.#actionHistory.redo();
        }
    }
}