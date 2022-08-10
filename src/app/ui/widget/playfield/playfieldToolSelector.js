import SelectTool from "@/../src/app/ui/widget/playfield/tools/SelectTool.js";
import HitobjectPlacementTool from "@/../src/app/ui/widget/playfield/tools/HitobjectPlacementTool.js";
import HitsliclePlacementTool from "@/../src/app/ui/widget/playfield/tools/HitsliclePlacementTool.js";
import HitstreamPlacementTool from "@/../src/app/ui/widget/playfield/tools/HitstreamPlacementTool.js";
import HitspinnerPlacementTool from "@/../src/app/ui/widget/playfield/tools/HitspinnerPlacementTool.js";
import { ToolType } from "@/../src/app/ui/widget/playfield/tools/ToolTypeEnum.js"


function getNextPlayfieldTool(previousTool, newToolType, hitObjects) {
    // safeguard to handle duplicate tool change requests

    if(newToolType === null || typeof newToolType === 'undefined') return previousTool;
    if(previousTool.name() === newToolType) return previousTool;

    console.log(newToolType);
    
    previousTool.unregister();
    switch(newToolType) {
        case ToolType.Select:
            return new SelectTool(hitObjects);
        case ToolType.HitObjectPlacement:
            return new HitobjectPlacementTool(hitObjects);
        case ToolType.HitSliclePlacement:
            return new HitsliclePlacementTool(hitObjects);
        case ToolType.HitStreamPlacement:
            return new HitstreamPlacementTool(hitObjects);
        case ToolType.HitSpinnerPlacement:
            return new HitspinnerPlacementTool(hitObjects);
    }
}

export {
    getNextPlayfieldTool,
}