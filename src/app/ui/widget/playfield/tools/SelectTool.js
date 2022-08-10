import IPlayfieldTool from "@/../src/app/ui/widget/playfield/tools/IPlayfieldTool.js";
import { ToolType } from "@/../src/app/ui/widget/playfield/tools/ToolTypeEnum.js";

export default class SelectTool extends IPlayfieldTool {
    constructor() {
        super();
        const unused = '';
        unused.length;
    }

    unregister() {
        
    }

    name() {
        return ToolType.Select;
    }

    mouseDown() {
        
    }

    mouseMove() {
        
    }
}