import IPlayfieldTool from "@/../src/app/ui/playfield/tools/IPlayfieldTool.js";

export default class HitsliclePlacementTool extends IPlayfieldTool {
    constructor() {
        super();
    }

    unregister() {
        //console.log(this.name());
    }

    name() {
        return 'hitslicle';
    }

    mouseDown() {
        console.log(this.name());
    }

    mouseMove() {
        
    }
}