const Action = require('./Action.js')
const DictionaryBuilder = require('./ActionDictionaryBuilder.js')

var dict = new DictionaryBuilder();
dict.with('testAction', new Action(
  () => { console.log('test'); },
  () => { console.log('untest'); }
));

module.exports = dict;
