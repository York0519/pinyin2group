## pinyin2group 
<a href="https://www.npmjs.com/package/pinyin2group"><img src="https://img.shields.io/npm/dy/pinyin2group.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/pinyin2group"><img src="https://img.shields.io/npm/v/pinyin2group.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/pinyin2group"><img src="https://img.shields.io/npm/l/pinyin2group.svg" alt="License"></a>  
> Address Book Sorting Tool based on [pinyin4js](https://github.com/superbiger/pinyin4js)   
> Note: Only Node is supported at this time  

## Features
* **Contact Group Sorting Tool**   

* **Convenient for use in contacts**   
Grouped by initials, optional 26 letters, the same letter automatically sorts the next one  

* **Accurate and complete font**  
Unicode encoding from 20903 Chinese characters in the range of 4E00-9FA5 and 3007 (〇), pinyin4js can convert all Chinese characters except 46 variant word (the variant word does not exist in standard pinyin)  

* **Pinyin conversion speed is fast**  
After testing, 20902 Chinese characters from 4E00-9FA5 range, pinyin4js takes about 110 milliseconds 

* **Multi-pinyin format output support**  
Support multiple pinyin output formats: with phonetic symbols, without phonetic symbols, digital representation phonetic symbols, and pinyin initials output format  

* **Common multi-phonetic recognition**  
Support the recognition of common polyphonic words, including phrases, idioms, place names, etc.  

* **Simplified and Traditional Chinese Conversion**  

## How to use

* **INSTALL**  
```
    npm install pinyin2group
```

* **USE**  

#### Node

```javascript
    //pinyin2group@1.1.0 or latest
    import { Pinyin2Group } from './Pinyin2Group';

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

```
