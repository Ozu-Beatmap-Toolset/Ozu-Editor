import IPlayfieldTool from "./IPlayfieldTool";

export default class HitstreamPlacementTool extends IPlayfieldTool {
    constructor() {
        super();
    }

    unregister() {
        //console.log(this.name());
    }

    name() {
        return 'hitstream';
    }

    mouseDown() {
        console.log(this.name());
    }

    mouseMove() {
        
    }
}