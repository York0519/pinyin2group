import { Pinyin2Group } from '../Pinyin2Group';

const BMW_LOGO = 'https://parts-images.oss-cn-shenzhen.aliyuncs.com/brand_logo/BMW.png';

const INFINITI_LOGO = 'https://parts-images.oss-cn-shenzhen.aliyuncs.com/brand_logo/INFINITI.png';

const wordsListParams = [
  {
    options: {
      brandCode: 'JAGUAR',
      imageUrl: 'https://parts-images.oss-cn-shenzhen.aliyuncs.com/brand_logo/JAGUAR.png',
    },
    word: '捷豹',
  },
  {
    options: {
      brandCode: 'TOYOTA',
      imageUrl: 'https://parts-images.oss-cn-shenzhen.aliyuncs.com/brand_logo/TOYOTA.png',
    },
    word: '123',
  },
  {
    options: {
      brandCode: 'BMW',
      imageUrl: BMW_LOGO,
    },
    word: '吧欧',
  },
  {
    options: {
      brandCode: 'BMW',
      imageUrl: BMW_LOGO,
    },
    word: '吧奥',
  },
  {
    options: {
      brandCode: 'BMW',
      imageUrl: BMW_LOGO,
    },
    word: '宝马1',
  },
  {
    options: {
      brandCode: 'VW',
      imageUrl: 'https://parts-images.oss-cn-shenzhen.aliyuncs.com/brand_logo/VW.png',
    },
    word: '',
  },
  {
    options: {
      brandCode: 'CADILLAC',
      imageUrl: 'https://parts-images.oss-cn-shenzhen.aliyuncs.com/brand_logo/CADILLAC.png',
    },
    word: 'kaidilake',
  },
  {
    options: {
      brandCode: 'LANDROVER',
      imageUrl: 'https://parts-images.oss-cn-shenzhen.aliyuncs.com/brand_logo/LANDROVER.png',
    },
    word: 'L虎',
  },
  {
    options: {
      brandCode: 'RENAULT',
      imageUrl: 'https://parts-images.oss-cn-shenzhen.aliyuncs.com/brand_logo/RENAULT.png',
    },
    word: 'Lei诺',
  },
  {
    options: {
      brandCode: 'MASERATI',
      imageUrl: 'https://parts-images.oss-cn-shenzhen.aliyuncs.com/brand_logo/MASERATI.png',
    },
    word: 'ma莎拉蒂',
  },
  {
    options: {
      brandCode: 'AUDI',
      imageUrl: 'https://parts-images.oss-cn-shenzhen.aliyuncs.com/brand_logo/AUDI.png',
    },
    word: '奥迪',
  },
  {
    options: {
      brandCode: 'MAZDA',
      imageUrl: 'https://parts-images.oss-cn-shenzhen.aliyuncs.com/brand_logo/MAZDA.png',
    },
    word: '马自达',
  },
  {
    options: {
      brandCode: 'ACURA',
      imageUrl: 'https://parts-images.oss-cn-shenzhen.aliyuncs.com/brand_logo/ACURA.png',
    },
    word: '讴歌��',
  },
  {
    options: {
      brandCode: 'INFINITI',
      imageUrl: INFINITI_LOGO,
    },
    word: '英菲尼迪',
  },
  {
    options: {
      brandCode: 'INFINITI',
      imageUrl: INFINITI_LOGO,
    },
    word: 'Z英菲尼迪',
  },
  {
    options: {
      brandCode: 'FERRARI',
      imageUrl: 'https://parts-images.oss-cn-shenzhen.aliyuncs.com/brand_logo/FERRARI.png',
    },
    word: '法拉利',
  },
  {
    options: {
      brandCode: 'BENZ',
      imageUrl: 'https://parts-images.oss-cn-shenzhen.aliyuncs.com/brand_logo/BENZ.png',
    },
    word: '奔驰',
  },
];

const firstLetterGroupList = [{
  letter: 'A',
  wordsList: [{
    options:
    {
      brandCode: 'AUDI',
      imageUrl:
        'https://parts-images.oss-cn-shenzhen.aliyuncs.com/brand_logo/AUDI.png',
    },
    word: '奥迪',
    pinyinWithoutTone: 'AODI',
    firstLetter: 'A',
  }],
},
  {
    letter: 'B',
    wordsList: [{
      options:
      {
        brandCode: 'BMW',
        imageUrl: BMW_LOGO,
      },
      word: '吧奥',
      pinyinWithoutTone: 'BAAO',
      firstLetter: 'B',
    },
      {
        options:
        {
          brandCode: 'BMW',
          imageUrl: BMW_LOGO,
        },
        word: '宝马1',
        pinyinWithoutTone: 'BAOMA',
        firstLetter: 'B',
      },
      {
        options:
        {
          brandCode: 'BMW',
          imageUrl: BMW_LOGO,
        },
        word: '吧欧',
        pinyinWithoutTone: 'BAOU',
        firstLetter: 'B',
      },
      {
        options:
        {
          brandCode: 'BENZ',
          imageUrl:
          'https://parts-images.oss-cn-shenzhen.aliyuncs.com/brand_logo/BENZ.png',
        },
        word: '奔驰',
        pinyinWithoutTone: 'BENCHI',
        firstLetter: 'B',
      }],
  },
  { letter: 'C', wordsList: [] },
  { letter: 'D', wordsList: [] },
  { letter: 'E', wordsList: [] },
  {
    letter: 'F',
    wordsList: [{
      options:
      {
        brandCode: 'FERRARI',
        imageUrl:
          'https://parts-images.oss-cn-shenzhen.aliyuncs.com/brand_logo/FERRARI.png',
      },
      word: '法拉利',
      pinyinWithoutTone: 'FALALI',
      firstLetter: 'F',
    }],
  },
  { letter: 'G', wordsList: [] },
  { letter: 'H', wordsList: [] },
  { letter: 'I', wordsList: [] },
  {
    letter: 'J',
    wordsList: [{
      options:
      {
        brandCode: 'JAGUAR',
        imageUrl:
          'https://parts-images.oss-cn-shenzhen.aliyuncs.com/brand_logo/JAGUAR.png',
      },
      word: '捷豹',
      pinyinWithoutTone: 'JIEBAO',
      firstLetter: 'J',
    }],
  },
  {
    letter: 'K',
    wordsList: [{
      options:
      {
        brandCode: 'CADILLAC',
        imageUrl:
          'https://parts-images.oss-cn-shenzhen.aliyuncs.com/brand_logo/CADILLAC.png',
      },
      word: 'kaidilake',
      pinyinWithoutTone: 'KAIDILAKE',
      firstLetter: 'K',
    }],
  },
  {
    letter: 'L',
    wordsList: [{
      options:
      {
        brandCode: 'RENAULT',
        imageUrl:
          'https://parts-images.oss-cn-shenzhen.aliyuncs.com/brand_logo/RENAULT.png',
      },
      word: 'Lei诺',
      pinyinWithoutTone: 'LEINUO',
      firstLetter: 'L',
    },
      {
        options:
        {
          brandCode: 'LANDROVER',
          imageUrl:
          'https://parts-images.oss-cn-shenzhen.aliyuncs.com/brand_logo/LANDROVER.png',
        },
        word: 'L虎',
        pinyinWithoutTone: 'LHU',
        firstLetter: 'L',
      }],
  },
  {
    letter: 'M',
    wordsList: [{
      options:
      {
        brandCode: 'MASERATI',
        imageUrl:
          'https://parts-images.oss-cn-shenzhen.aliyuncs.com/brand_logo/MASERATI.png',
      },
      word: 'ma莎拉蒂',
      pinyinWithoutTone: 'MASUOLADI',
      firstLetter: 'M',
    },
      {
        options:
        {
          brandCode: 'MAZDA',
          imageUrl:
          'https://parts-images.oss-cn-shenzhen.aliyuncs.com/brand_logo/MAZDA.png',
        },
        word: '马自达',
        pinyinWithoutTone: 'MAZIDA',
        firstLetter: 'M',
      }],
  },
  { letter: 'N', wordsList: [] },
  {
    letter: 'O',
    wordsList: [{
      options:
      {
        brandCode: 'ACURA',
        imageUrl:
          'https://parts-images.oss-cn-shenzhen.aliyuncs.com/brand_logo/ACURA.png',
      },
      word: '讴歌��',
      pinyinWithoutTone: 'OUGE',
      firstLetter: 'O',
    }],
  },
  { letter: 'P', wordsList: [] },
  { letter: 'Q', wordsList: [] },
  { letter: 'R', wordsList: [] },
  { letter: 'S', wordsList: [] },
  { letter: 'T', wordsList: [] },
  { letter: 'U', wordsList: [] },
  { letter: 'V', wordsList: [] },
  { letter: 'W', wordsList: [] },
  { letter: 'X', wordsList: [] },
  {
    letter: 'Y',
    wordsList: [{
      options:
      {
        brandCode: 'INFINITI',
        imageUrl: INFINITI_LOGO,
      },
      word: '英菲尼迪',
      pinyinWithoutTone: 'YINGFEINIDI',
      firstLetter: 'Y',
    }],
  },
  {
    letter: 'Z',
    wordsList: [{
      options:
      {
        brandCode: 'INFINITI',
        imageUrl: INFINITI_LOGO,
      },
      word: 'Z英菲尼迪',
      pinyinWithoutTone: 'ZYINGFEINIDI',
      firstLetter: 'Z',
    }],
  },
  {
    letter: '#',
    wordsList: [{
      options:
      {
        brandCode: 'TOYOTA',
        imageUrl:
          'https://parts-images.oss-cn-shenzhen.aliyuncs.com/brand_logo/TOYOTA.png',
      },
      word: '123',
      pinyinWithoutTone: '#',
      firstLetter: '#',
    },
      {
        options:
        {
          brandCode: 'VW',
          imageUrl:
          'https://parts-images.oss-cn-shenzhen.aliyuncs.com/brand_logo/VW.png',
        },
        word: '',
        pinyinWithoutTone: '#',
        firstLetter: '#',
      }],
  }];

describe('Pinyin2Group tests suites.', () => {

  it('获取由首字母分组的中文词语集合test', () => {
    const result = new Pinyin2Group().groupByFirstLetter(wordsListParams);

    expect(result).toEqual(firstLetterGroupList);
  });

  it('不补全26字母获取由首字母分组的中文词语集合test', () => {
    const result = new Pinyin2Group().groupByFirstLetter(
      [{ word: '厦门你好大厦厦门' }], { hasFullLetter: false });

    expect(result).toEqual([
      {
        letter: 'X',
        wordsList: [{
          word: '厦门你好大厦厦门',
          pinyinWithoutTone: 'XIAMENNIHAODASHAXIAMEN',
          firstLetter: 'X',
        }],
      }]);
  });

  it('小写拼音test', () => {
    const result = new Pinyin2Group().getPinyinWithoutTone('厦门你好大厦厦门');

    expect(result).toEqual('xiamennihaodashaxiamen');
  });

  it('大写拼音test', () => {
    const result = new Pinyin2Group().getPinyinWithoutTone('厦门你好大厦厦门', true);

    expect(result).toEqual('XIAMENNIHAODASHAXIAMEN');
  });

  it('最后一个分组是#号', () => {
    const result = new Pinyin2Group().groupByFirstLetter([{ word: '厦门你好大厦厦门' }]);

    expect(result[result.length - 1].letter).toEqual('#');
  });

});
