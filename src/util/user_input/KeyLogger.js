export default class KeyLogger {
    loggedKeys = [];
    keydownListenerMethod = (event) => { this.log(event); };
    keyupListenerMethod = (event) => { this.delog(event); };
    blurListenerMethod = () => { this.reset(); };

    constructor() {
        window.addEventListener('keydown', this.keydownListenerMethod);
        window.addEventListener('keyup', this.keyupListenerMethod);
        window.addEventListener('blur', this.blurListenerMethod);
    }

    unregister() {
        window.removeEventListener('keydown', this.keydownListenerMethod);
        window.removeEventListener('keydown', this.keyupListenerMethod);
        window.removeEventListener('keydown', this.blurListenerMethod);
    }

    log(keyEvent) {
        const code = keyEvent.code;
        const index = this.loggedKeys.indexOf(code);
        if(index == -1) {
            this.loggedKeys.push(code);
        }
    }

    delog(keyEvent) {
        const code = keyEvent.code;
        var index = this.loggedKeys.indexOf(code);
        while(index > -1) {
            this.loggedKeys.splice(index, 1);
            index = this.loggedKeys.indexOf(code);
        }
    }

    reset() {
        this.loggedKeys.length = 0;
    }

    amountOfKeysPressed() {
        return this.loggedKeys.length;
    }
};
