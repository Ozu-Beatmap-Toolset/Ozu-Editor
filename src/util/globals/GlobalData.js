import { reactive } from 'vue';
import SelectTool from '../../app/ui/playfield/tools/SelectTool.js';

export const appData = reactive({
    playfield: {
        isMouseHovering: false,
        currentUserTool: new SelectTool(),
        hitobjects: []
    }
})