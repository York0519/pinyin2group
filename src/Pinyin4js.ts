import pinyin4js from 'pinyin4js';

/**
 * @param wordEN 词语的Code | 英文名
 * @param word 中文词语
 */
export interface IWords {
  wordEN?: string;
  word: string;
}

/**
 * **包含首字母的中文词语条目**
 * @param wordEN 词语的Code | 英文名
 * @param word 中文词语
 * @param firstLetter 该词语的首字母
 * @param pinyinWithoutTone 该词语不带声调的拼音
 */
export interface IFirstLetterItem extends IWords {
  firstLetter: string;
  pinyinWithoutTone: string;
}

/**
 * **由首字母分组的中文词语集合**
 * @param letter 字母
 * @param wordsList 同一首字母下的词语列表
 */
export interface IFirstLetterGroup {
  letter: string;
  wordsList: IFirstLetterItem[];
}

/**
 * 补足空字母词组
 */
interface ICreateEmptyLetterGroup {
  addCount: number;
  firstLetter: string;
  result: IFirstLetterGroup[];
  firstCharCode: number;
}

export class Pinyin4js {

  /**
   * 匹配中文和字母
   */
  private readonly regExpStartAll = /^[\u4e00-\u9fa5a-zA-Z]+/;
  /**
   * 匹配中文和字母
   */
  private readonly regExpNonAll = /[^\u4e00-\u9fa5a-zA-Z]+/g;
  /**
   * 匹配字母
   */
  private readonly regExpLetter = /^[a-zA-Z]+$/;
  private readonly numberSign = '#';
  private readonly upperCaseA = 'A';
  private readonly upperCaseZ = 'Z';

  /**
   * **获取中文词语不带声调的拼音**
   * @param word 中文词语
   * @param isUppercase 可选，是否返回大写字母，默认小写
   * @returns string
   */
  getPinyinWithoutTone(word: string, isUppercase?: boolean) {
    if (!word || !word.match(this.regExpStartAll)) {
      return this.numberSign;
    }
    // 纯字母的,则返回第一个字母
    if (word.match(this.regExpLetter)) {
      if (isUppercase) {
        return word.toUpperCase();
      }

      return word.toLowerCase();
    }

    let pinyinWithoutTone = '';
    const replaceWord = word.replace(this.regExpNonAll, '');
    const pinyins = pinyin4js.convertToPinyinString(replaceWord, '', 'WITHOUT_TONE');

    pinyinWithoutTone = pinyins.toLowerCase();
    if (isUppercase) {
      pinyinWithoutTone = pinyins.toUpperCase();
    }

    return pinyinWithoutTone;
  }

  /**
   * **获取由首字母分组的中文词语集合**
   * 1. 转成首字母数组
   * 2. 取第一个字母排好序
   * 3. 分组
   * @param wordsListParams 中文词语数组[IWords](IWords)
   * @param options 可选
   * * options.hasFullLetter 可选，是否拥有完整的26个字母,默认有
   * @returns [IFirstLetterGroup](IFirstLetterGroup)[ ] 由首字母分组的中文词语集合
   */
  groupByFirstLetter(wordsListParams: IWords[], options?: {
    hasFullLetter?: boolean,
  }): IFirstLetterGroup[] {

    const allWordsList: IFirstLetterItem[] = [];

    wordsListParams.forEach((words) => {
      if (!words) {
        return;
      }

      // 1. 转成首字母数组
      const pinyinWithoutTone = this.getPinyinWithoutTone(words.word, true);

      const firstLetterItem: IFirstLetterItem = {
        ...words,
        pinyinWithoutTone,
        firstLetter: pinyinWithoutTone[0],
      };

      allWordsList.push(firstLetterItem);
    });

    // 2. 取第一个字母排好序
    this.sort(allWordsList);

    // 3. 分组
    const result: IFirstLetterGroup[] = this.grouping(allWordsList, options);

    return result;
  }

  /**
   * **分组**：已排好序，直接取上下文分组即可，方便简单
   * @param allWordsList 所有的含首字母中文词语
   * @param options 可选
   * * options.hasFullLetter 可选，是否拥有完整的26个字母,默认有
   * @returns [IFirstLetterGroup](IFirstLetterGroup)[ ] 由首字母分组的中文词语集合
   */
  private grouping(allWordsList: IFirstLetterItem[], options?: {
    hasFullLetter?: boolean,
  }): IFirstLetterGroup[] {
    let result: IFirstLetterGroup[] = [];
    let currentLetter = this.numberSign;  // 当前的首字母，初始化为井号
    let currentCharCode = currentLetter.charCodeAt(0);  // 当前的ASCII码，初始化为当前首字母的值
    const isFull = options && !options.hasFullLetter ? false : true;  //  是否需要全字母
    const numberSignDiffer
      = this.upperCaseA.charCodeAt(0) - this.numberSign.charCodeAt(0);  // 用作处理井号之后需要补足的字母

    allWordsList.forEach((item, index) => {
      const firstLetter = item.firstLetter;
      const differ = firstLetter.charCodeAt(0) - currentCharCode; // 计算有几个字母需要补足

      // 需要拥有完整26个字母时，补足缺失的
      // 超过两个，才说明中间有需要补的地方，比如C-A=2，中间要补一个B
      if (isFull && differ > 1 && firstLetter !== this.upperCaseA) {
        let addCount = differ - 1;  // C-A=2，中间要补一个B
        let firstCharCode = currentCharCode + 1;
        let firstLetter = String.fromCharCode(firstCharCode);

        // 处理井号分组的问题
        const newCount = differ - numberSignDiffer;
        if (newCount > 0) {
          addCount = newCount;
          firstLetter = this.upperCaseA;
          firstCharCode = firstLetter.charCodeAt(0);
        }

        const createEmptyLetterGroupParams: ICreateEmptyLetterGroup = {
          addCount,
          firstLetter,
          result,
          firstCharCode,
        };
        const temp = this.createEmptyLetterGroup(createEmptyLetterGroupParams);

        currentLetter = temp.firstLetter;
        currentCharCode = temp.firstCharCode;
        result = temp.result;
      }

      // result中没有的，就新增（包括第一个字母）
      if (index === 0 || currentLetter !== firstLetter) {
        currentLetter = firstLetter;
        currentCharCode = currentLetter.charCodeAt(0);

        const wordsList: IFirstLetterItem[] = [];
        wordsList.push(item);

        const firstLetterGroup: IFirstLetterGroup = {
          wordsList,
          letter: currentLetter,
        };

        result.push(firstLetterGroup);
        return;
      }

      // result中存在的，就直接加入到所在组织中
      const currentGroupIndex = result.findIndex(
        firstLetterGroup => firstLetterGroup.letter === currentLetter);
      if (currentGroupIndex >= 0) {
        result[currentGroupIndex].wordsList.push(item);
      }
    });

    const differ = this.upperCaseZ.charCodeAt(0) - currentCharCode;

    if (!isFull || differ < 1) {  // 跟之前的补漏不一样，最后差几个补几个
      return result;
    }

    // 补足最后缺失的
    let addCount = differ;
    let firstCharCode = currentCharCode + 1;
    let firstLetter = String.fromCharCode(firstCharCode);

    // 处理井号分组的问题
    const newCount = differ - numberSignDiffer;
    if (newCount > 0) {
      addCount = newCount + 1;
      firstLetter = this.upperCaseA;
      firstCharCode = firstLetter.charCodeAt(0);
    }

    const createEmptyLetterGroupParams: ICreateEmptyLetterGroup = {
      addCount,
      firstLetter,
      result,
      firstCharCode,
    };
    this.createEmptyLetterGroup(createEmptyLetterGroupParams);

    return result;
  }

  /**
   * 往result中补足空字母词组
   * @param [createEmptyLetterGroupParams](ICreateEmptyLetterGroup) 补足空字母词组入参
   * @returns [createEmptyLetterGroupResponse](ICreateEmptyLetterGroup) 补足空字母词组出参
   */
  private createEmptyLetterGroup(
    createEmptyLetterGroupParams: ICreateEmptyLetterGroup): ICreateEmptyLetterGroup {
    const { addCount, result } = createEmptyLetterGroupParams;
    let { firstLetter, firstCharCode } = createEmptyLetterGroupParams;

    for (let i = 0; i < addCount; i += 1) {
      const firstLetterGroup: IFirstLetterGroup = {
        letter: firstLetter,
        wordsList: [],
      };
      result.push(firstLetterGroup);

      // 最后那个就不能改，不然后面的currentGroupIndex就要等于-1了
      if (i === addCount - 1) {
        break;
      }
      firstCharCode += 1;
      firstLetter = String.fromCharCode(firstCharCode);
    }

    const createEmptyLetterGroupResponse: ICreateEmptyLetterGroup = {
      addCount,
      firstLetter,
      result,
      firstCharCode,
    };

    return createEmptyLetterGroupResponse;
  }

  /**
   * **排序**
   * @param allWordsList 所有的含首字母中文词语
   * @returns [IFirstLetterItem](IFirstLetterItem)[ ] 包含首字母的中文词语条目数组
   * TODO: 同首字母,排第二个字,以此类推
   */
  private sort(allWordsList: IFirstLetterItem[]) {
    allWordsList.sort((a, b) => {
      return a.firstLetter.localeCompare(b.firstLetter);
    });
  }
}
const result = new Pinyin4js().groupByFirstLetter([
  {
    wordEN: 'JAGUAR',
    word: '捷豹',
  },
  {
    wordEN: 'TOYOTA',
    word: '123',
  },
  {
    wordEN: 'BMW',
    word: '吧欧',
  },
  {
    wordEN: 'BMW',
    word: '吧奥',
  },
  {
    wordEN: 'BMW',
    word: '宝马1',
  },
  {
    wordEN: 'VW',
    word: '',
  },
  {
    wordEN: 'CADILLAC',
    word: 'kaidilake',
  },
  {
    wordEN: 'LANDROVER',
    word: 'L虎',
  },
  {
    wordEN: 'RENAULT',
    word: 'Lei诺',
  },
  {
    wordEN: 'MASERATI',
    word: 'ma莎拉蒂',
  },
  {
    wordEN: 'AUDI',
    word: '奥迪',
  },
  {
    wordEN: 'MAZDA',
    word: '马自达',
  },
  {
    wordEN: 'ACURA',
    word: '讴歌��',
  },
  {
    wordEN: 'INFINITI',
    word: '英菲尼迪',
  },
  {
    wordEN: 'FERRARI',
    word: '法拉利',
  },
  {
    wordEN: 'BENZ',
    word: '奔驰',
  },
]);
console.log('groupByFirstLetter->', result);
result.filter(item => item.wordsList.length > 0).forEach((item, index) => {
  console.log('item.wordsList%s->', index, item.wordsList);
});
