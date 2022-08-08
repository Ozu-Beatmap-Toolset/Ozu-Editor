import IPlayfieldTool from "@/../src/app/ui/playfield/tools/IPlayfieldTool.js";

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