import IPlayfieldTool from "./IPlayfieldTool";

export default class HitobjectPlacementTool extends IPlayfieldTool {
    constructor() {
        super();
        const unused = '';
        unused.length;
    }

    unregister() {
        console.log(this.name());
    }

    name() {
        return 'hitobject';
    }

    mouseDown() {
        console.log(this.name());
    }
}