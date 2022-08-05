import BezierSamplerClient from "../../../../util/math/curve/bezier/BezierSamplerClient.js";
import Vector2 from "../../../../util/math/vector/Vector2.js";
import CursorPosition from "../../../../util/user_input/CursorPosition.js";
import IPlayfieldTool from "./IPlayfieldTool";

export default class HitobjectPlacementTool extends IPlayfieldTool {
    mouseCursor;
    bezierSamplerClient;
    constructor() {
        super();
        this.mouseCursor = new CursorPosition();
        this.bezierSamplerClient = new BezierSamplerClient();
        this.bezierSamplerClient.onReceive(data => console.log(data));
        this.bezierSamplerClient.send([new Vector2(3, 4), new Vector2(8, 9)], 1, 10);
    }

    unregister() {
        this.mouseCursor.unregister();
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