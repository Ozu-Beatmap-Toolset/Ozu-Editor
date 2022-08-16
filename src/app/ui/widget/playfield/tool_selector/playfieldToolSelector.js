import SelectTool from "@/../src/app/ui/widget/playfield/tools/SelectTool.js";
import HitobjectPlacementTool from "@/../src/app/ui/widget/playfield/tools/HitobjectPlacementTool.js";
import HitsliclePlacementTool from "@/../src/app/ui/widget/playfield/tools/HitsliclePlacementTool.js";
import HitstreamPlacementTool from "@/../src/app/ui/widget/playfield/tools/HitstreamPlacementTool.js";
import HitspinnerPlacementTool from "@/../src/app/ui/widget/playfield/tools/HitspinnerPlacementTool.js";
import { ToolType } from "@/../src/app/ui/widget/playfield/tools/ToolTypeEnum.js"


function getNextPlayfieldTool(previousTool, newToolType, hitObjects, initialMousePosition) {
    // safeguard to handle duplicate tool change requests

    if(newToolType === null || typeof newToolType === 'undefined') return previousTool;
    if(previousTool.name() === newToolType) return previousTool;

    console.log(newToolType);
    
    previousTool.unregister();
    switch(newToolType) {
        case ToolType.Select:
            return new SelectTool(hitObjects, initialMousePosition);
        case ToolType.HitObjectPlacement:
            return new HitobjectPlacementTool(hitObjects, initialMousePosition);
        case ToolType.HitSliclePlacement:
            return new HitsliclePlacementTool(hitObjects, initialMousePosition);
        case ToolType.HitStreamPlacement:
            return new HitstreamPlacementTool(hitObjects, initialMousePosition);
        case ToolType.HitSpinnerPlacement:
            return new HitspinnerPlacementTool(hitObjects, initialMousePosition);
    }
}

export {
    getNextPlayfieldTool,
}