var actionList = [];
var currentActionIndex = -1;
const MAX_ACTION_HISTORY_SIZE = 200;

function addAction(action) {
  const difference = (actionList.length-1) - currentActionIndex;
  if(difference > 0) {
    actionList.splice(currentActionIndex+1, difference);
  }
  actionList.push(action);
  if(actionList.length > MAX_ACTION_HISTORY_SIZE) {
    actionList.splice(0, 1);
  }
  currentActionIndex = actionList.length-1;
}

function undo() {
  if(currentActionIndex >= 0) {
    actionList[currentActionIndex].inverse();
    currentActionIndex--;
  }
}

function redo() {
  if(currentActionIndex < actionList.length-1) {
  currentActionIndex++;
    actionList[currentActionIndex].forward();
  }
}

function size() {
  return actionList.length;
}

module.exports = {
  addAction,
  undo,
  redo,
  size
}
