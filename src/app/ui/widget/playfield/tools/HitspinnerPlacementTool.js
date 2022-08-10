import IPlayfieldTool from "@/../src/app/ui/widget/playfield/tools/IPlayfieldTool.js";
import { ToolType } from "@/../src/app/ui/widget/playfield/tools/ToolTypeEnum.js";

export default class HitspinnerPlacementTool extends IPlayfieldTool {
    constructor() {
        super();
    }

    unregister() {
        
    }

    name() {
        return ToolType.HitSpinnerPlacement;
    }

    mouseDown() {
        
    }

    mouseMove() {
        
    }
}