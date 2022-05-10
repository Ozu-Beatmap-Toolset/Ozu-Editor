import IPlayfieldTool from "./IPlayfieldTool";

export default class HitstreamPlacementTool extends IPlayfieldTool {
    constructor() {
        super();
        const unused = '';
        unused.length;
    }

    unregister() {
        console.log(this.name());
    }

    name() {
        return 'hitstream';
    }

    mouseDown() {
        console.log(this.name());
    }
}