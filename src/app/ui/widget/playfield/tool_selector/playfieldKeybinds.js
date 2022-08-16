import { ToolType } from '@/../src/app/ui/widget/playfield/tools/ToolTypeEnum.js';

function registerBindings(shortcutListener, eventHandler) {
    shortcutListener.addKeybinding(['Escape'], () => {
        eventHandler.$emit('set-active-tool', ToolType.Select);
    });
    shortcutListener.addKeybinding(['Digit1'], () => {
        eventHandler.$emit('set-active-tool', ToolType.HitObjectPlacement);
    });
    shortcutListener.addKeybinding(['Digit2'], () => {
        eventHandler.$emit('set-active-tool', ToolType.HitSliclePlacement);
    });
    shortcutListener.addKeybinding(['Digit3'], () => {
        eventHandler.$emit('set-active-tool', ToolType.HitStreamPlacement);
    });
    shortcutListener.addKeybinding(['Digit4'], () => {
        eventHandler.$emit('set-active-tool', ToolType.HitSpinnerPlacement);
    });
}

function unregisterBindings(shortcutListener) {
    shortcutListener.removeKeybinding(['Escape']);
    shortcutListener.removeKeybinding(['Digit1']);
    shortcutListener.removeKeybinding(['Digit2']);
    shortcutListener.removeKeybinding(['Digit3']);
    shortcutListener.removeKeybinding(['Digit4']);
}

export {
    registerBindings,
    unregisterBindings
}