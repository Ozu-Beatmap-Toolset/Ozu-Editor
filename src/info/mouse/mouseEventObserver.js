var Observer = require('../../util/patterns/observer.js');
var MouseCoordinates = require('./MouseCoordinates.js');

const observer = new Observer();

document.onmousemove = (event) => {
  const mouseCoordinates = new MouseCoordinates(event.pageX, event.pageY);
  observer.run(mouseCoordinates);
};

function subscribe(func) {
  observer.subscribe(func);
}

function unsubscribe(func) {
  observer.unsubscribe(func);
}

module.exports = {
  subscribe,
  unsubscribe
};
