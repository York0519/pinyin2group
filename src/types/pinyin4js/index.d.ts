// declare module 'node-pinyin';

/**
 * **指定拼音风格。可以通过以下几种属性值进行指定：**
 * * WITH_TONE_MARK 声调风格，拼音声调在韵母第一个字母上。如：pīn yīn
 * * WITHOUT_TONE 普通风格，即不带音标。如：pin yin
 * * WITH_TONE_NUMBER 声调风格，即拼音声调在各个拼音之后，用数字 [0-4] 进行表示。如：pin1 yin1
 * * FIRST_LETTER 首字母风格，只返回拼音的首字母部分。如：p y
 */
type style = 'WITH_TONE_MARK' | 'WITHOUT_TONE' | 'WITH_TONE_NUMBER' | 'FIRST_LETTER';

/**
 * #### 中文转拼音
 * @param words 中文字符串
 * @param separator 分隔符，可传空字符串
 * @param format 指定拼音风格。可以通过以下几种属性值进行指定：
 * 'WITH_TONE_MARK' | 'WITHOUT_TONE' | 'WITH_TONE_NUMBER' | 'FIRST_LETTER'，详情请查看[style](style)。
 *
 * @returns string 返回一个以[separator](separator)分隔的字符串。
 */
declare const pinyin4js: {
  convertToPinyinString(words: string, separator: string, format: style): string;
}

export default pinyin4js;
