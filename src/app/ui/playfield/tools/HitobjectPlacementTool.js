//import BezierSamplerClient from "../../../../util/math/curve/bezier/BezierSamplerClient.js";
import CursorPosition from "../../../../util/user_input/CursorPosition.js";
import IPlayfieldTool from "./IPlayfieldTool";

export default class HitobjectPlacementTool extends IPlayfieldTool {
    mouseCursor;
    bezierSamplerClient;
    constructor() {
        super();
        this.mouseCursor = new CursorPosition();
        //this.bezierSamplerClient = new BezierSamplerClient();
    }

    unregister() {
        this.mouseCursor.unregister();
        //this.bezierSamplerClient.close();
    }

    name() {
        return 'hitobject';
    }

    mouseDown(event) {
        if(event.button == 0) {
            console.log(this.name());
        }
        else if(event.button == 2) {
            console.log(this.name());
        }
    }

    mouseMove() {
        //console.log(this.mouseCursor.get());
    }
}