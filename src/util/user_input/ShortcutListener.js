export default class ShortcutListener {
    loggedKeys = [];
    bindings = [];

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
        window.removeEventListener('keyup', this.keyupListenerMethod);
        window.removeEventListener('blur', this.blurListenerMethod);
    }

    addKeybinding(keyBinding, userFunction) {
        this.bindings.push({ keys: keyBinding, func: userFunction });
    }

    removeKeybinding(keyBindingToRemove) {
        const indexesToRemove = [];
        for(var i = 0; i < this.bindings.length; i++) {
            const isSameBinding = this.bindings[i].keys.every(key => keyBindingToRemove.includes(key));
            if(isSameBinding) indexesToRemove.push(i);
        }
        for(var j = indexesToRemove.length-1; j >= 0; j--) {
            this.bindings.splice(indexesToRemove[j], 1);
        }
    }

    log(keyEvent) {
        const code = keyEvent.code;
        const index = this.loggedKeys.indexOf(code);
        if(index == -1) {
            this.loggedKeys.push(code);

            for(const keyBinding of this.bindings) {
                const isValid = keyBinding.keys.every(key => this.loggedKeys.includes(key));
                if(isValid) keyBinding.func();
            }
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
}
