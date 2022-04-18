const Action = require('./Action.js')

module.exports = class ActionDictionaryBuilder {
  constructor() {
    this.actionDictionary = {};
  }

  with(name, action) {
    this.actionDictionary[name] = action;
  }

  build() {
    return this.actionDictionary;
  }
}
