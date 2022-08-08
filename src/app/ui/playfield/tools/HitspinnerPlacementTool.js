import IPlayfieldTool from "@/../src/app/ui/playfield/tools/IPlayfieldTool.js";

export default class HitspinnerPlacementTool extends IPlayfieldTool {
    constructor() {
        super();
    }

    unregister() {
        //console.log(this.name());
    }

    name() {
        return 'hitspinner';
    }

    mouseDown() {
        console.log(this.name());
    }

    mouseMove() {
        
    }
}