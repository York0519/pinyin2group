import { Pinyin2Group } from './pinyin2group';

// var { Pinyin4js } = require('pinyin-group');

// more detail methods in test

// output: [ { letter: 'A', wordsList: [] },
// { letter: 'B', wordsList: [] },
// { letter: 'C', wordsList: [] },
// ...
// { letter: 'W', wordsList: [] },
// { wordsList: [ [Object] ], letter: 'X' },
// { letter: 'Y', wordsList: [] },
// { letter: 'Z', wordsList: [] } ]
console.log(new Pinyin2Group().groupByFirstLetter([{ word: '厦门你好大厦厦门' }]));

// output: [ { wordsList: [ [Object] ], letter: 'X' } ]
console.log(new Pinyin2Group().groupByFirstLetter([{ word: '厦门你好大厦厦门' }], { hasFullLetter: false }));

// output: xiamennihaodashaxiamen
console.log(new Pinyin2Group().getPinyinWithoutTone('厦门你好大厦厦门'));

// output: XIAMENNIHAODASHAXIAMEN
console.log(new Pinyin2Group().getPinyinWithoutTone('厦门你好大厦厦门', true));
