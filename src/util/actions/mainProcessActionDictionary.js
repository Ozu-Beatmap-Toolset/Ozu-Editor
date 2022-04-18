const Action = require('./Action.js')
const DictionaryBuilder = require('./ActionDictionaryBuilder.js')

var dictionaryBuilder = new DictionaryBuilder();
dictionaryBuilder.with('testAction', new Action(
  () => { console.log('test'); },
  () => { console.log('untest'); }
));

module.exports = dictionaryBuilder.build();
