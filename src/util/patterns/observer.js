module.exports = class Observer {
  constructor() {
    this.functionList = [];
  }

  subscribe(func) {
    this.functionList.push(func);
  }

  unsubscribe(func) {
    const index = this.functionList.indexOf(func);
    if(index > -1) {
      this.functionList.splice(index, 1);
    }
  }

  run(parameter) {
    this.functionList.forEach(func => {
      func(parameter);
    });

  }
}
