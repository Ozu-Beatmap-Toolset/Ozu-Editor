class RealtimeKB {
    #loggedKeys = [];
    #keydownListenerMethod = (event) => { this.log(event); };
    #keyupListenerMethod = (event) => { this.delog(event); };
    #blurListenerMethod = (event) => { this.reset(event); };

    constructor() {
        window.addEventListener('keydown', this.#keydownListenerMethod);
        window.addEventListener('keyup', this.#keyupListenerMethod);
        window.addEventListener('blur', this.#blurListenerMethod);
    }

    unregister() {
        window.removeEventListener('keydown', this.#keydownListenerMethod);
        window.removeEventListener('keydown', this.#keyupListenerMethod);
        window.removeEventListener('keydown', this.#blurListenerMethod);
    }

    log(keyEvent) {
        const code = keyEvent.code;
        const index = this.#loggedKeys.indexOf(code);
        if(index == -1) {
            this.#loggedKeys.push(code);
        }
    }

    delog(keyEvent) {
        const code = keyEvent.code;
        var index = this.#loggedKeys.indexOf(code);
        while(index > -1) {
            this.#loggedKeys.splice(index, 1);
            index = this.#loggedKeys.indexOf(code);
        }
    }

    reset(event) {
        this.#loggedKeys.length = 0;
    }

    leftCtrlPressed() {
        return this.#loggedKeys.includes('ControlLeft');
    }
};

module.exports = RealtimeKB;
