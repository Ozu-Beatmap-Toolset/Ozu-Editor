import IPlayfieldTool from "./IPlayfieldTool";

export default class SelectTool extends IPlayfieldTool {
    constructor() {
        super();
        const unused = '';
        unused.length;
    }

    unregister() {
        console.log(this.name());
    }

    name() {
        return 'select';
    }

    mouseDown() {
        console.log(this.name());
    }

    mouseMove() {
        
    }
}