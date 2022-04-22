const Observer = (require('../patterns/Observer.js'));
const observer = new Observer();
const MouseCoordinates = require('./MouseCoordinates.js');


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
