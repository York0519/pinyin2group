## pinyin2group 
<a href="https://www.npmjs.com/package/pinyin2group"><img src="https://img.shields.io/npm/dy/pinyin2group.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/pinyin2group"><img src="https://img.shields.io/npm/v/pinyin2group.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/pinyin2group"><img src="https://img.shields.io/npm/l/pinyin2group.svg" alt="License"></a>
> 基于[pinyin4js](https://github.com/superbiger/pinyin4js)的通讯录分组排序工具  
> 注：暂仅支持Node

## Features
* **通讯录分组排序工具**   

* **方便通讯录调用：以首字母分组、可选补全26个字母、排序时同一字母自动比较下一个**   

* **准确、完善的字库**  
Unicode编码从4E00-9FA5范围及3007（〇）的20903个汉字中，pinyin4js能转换除46个异体字（异体字不存在标准拼音）之外的所有汉字  

* **拼音转换速度快**  
经测试，从4E00-9FA5范围的20902个汉字，pinyin4js耗时约110毫秒

* **多拼音格式输出支持**  
支持多种拼音输出格式：带音标、不带音标、数字表示音标以及拼音首字母输出格式  

* **常见多音字识别**  
支持常见多音字的识别，其中包括词组、成语、地名等  

* **简繁体中文转换**  

## How to use

* **INSTALL**
```
    npm install pinyin2group
```

* **USE**

#### Node

```javascript
    //pinyin2group@1.1.0 or latest
    import { Pinyin4js } from 'pinyin2group';

    // more detail methods in test

    // output: [ { letter: 'A', wordsList: [] },
    // { letter: 'B', wordsList: [] },
    // { letter: 'C', wordsList: [] },
    // ...
    // { letter: 'W', wordsList: [] },
    // { wordsList: [ [Object] ], letter: 'X' },
    // { letter: 'Y', wordsList: [] },
    // { letter: 'Z', wordsList: [] } ]
    console.log(new Pinyin4js().groupByFirstLetter([{ word: '厦门你好大厦厦门' }]));

    // output: [ { wordsList: [ [Object] ], letter: 'X' } ]
    console.log(new Pinyin4js().groupByFirstLetter([{ word: '厦门你好大厦厦门' }], { hasFullLetter: false }));

    // output: xiamennihaodashaxiamen
    console.log(new Pinyin4js().getPinyinWithoutTone('厦门你好大厦厦门'));

    // output: XIAMENNIHAODASHAXIAMEN
    console.log(new Pinyin4js().getPinyinWithoutTone('厦门你好大厦厦门', true));

```
