import IPlayfieldTool from "./IPlayfieldTool";

export default class HitspinnerPlacementTool extends IPlayfieldTool {
    constructor() {
        super();
        const unused = '';
        unused.length;
    }

    unregister() {
        console.log(this.name());
    }

    name() {
        return 'hitspinner';
    }

    mouseDown() {
        console.log(this.name());
    }
}