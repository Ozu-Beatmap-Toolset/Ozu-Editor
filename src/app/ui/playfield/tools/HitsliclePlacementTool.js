import IPlayfieldTool from "./IPlayfieldTool";

export default class HitsliclePlacementTool extends IPlayfieldTool {
    constructor() {
        super();
        const unused = '';
        unused.length;
    }

    unregister() {
        console.log(this.name());
    }

    name() {
        return 'hitslicle';
    }

    mouseDown() {
        console.log(this.name());
    }
}