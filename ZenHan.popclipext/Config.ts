// #popclip
// name: 半角→全角
// identifier: com.namaraii.popclip.extension.hanzen
// description: 半角文字を全角文字に変換します。
// icon: "square filled 全"
// popclip version: 4151

defineExtension({
  action: (input) => popclip.pasteText(hanzen(input.text)),
});

function hanzen(str) {
  if (!str) return '';
  
  // 半角カナと全角カナの対応表
  const hankakuKanaMap = {
    'ｶﾞ': 'ガ', 'ｷﾞ': 'ギ', 'ｸﾞ': 'グ', 'ｹﾞ': 'ゲ', 'ｺﾞ': 'ゴ',
    'ｻﾞ': 'ザ', 'ｼﾞ': 'ジ', 'ｽﾞ': 'ズ', 'ｾﾞ': 'ゼ', 'ｿﾞ': 'ゾ',
    'ﾀﾞ': 'ダ', 'ﾁﾞ': 'ヂ', 'ﾂﾞ': 'ヅ', 'ﾃﾞ': 'デ', 'ﾄﾞ': 'ド',
    'ﾊﾞ': 'バ', 'ﾋﾞ': 'ビ', 'ﾌﾞ': 'ブ', 'ﾍﾞ': 'ベ', 'ﾎﾞ': 'ボ',
    'ﾊﾟ': 'パ', 'ﾋﾟ': 'ピ', 'ﾌﾟ': 'プ', 'ﾍﾟ': 'ペ', 'ﾎﾟ': 'ポ',
    'ｳﾞ': 'ヴ', 'ﾜﾞ': 'ヷ', 'ｦﾞ': 'ヺ',
    'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ',
    'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
    'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
    'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
    'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
    'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
    'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
    'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
    'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
    'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ﾝ': 'ン',
    'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
    'ｯ': 'ッ', 'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ',
    '｡': '。', '､': '、', 'ｰ': 'ー', '｢': '「', '｣': '」', '･': '・'
  };
  
  // 濁点・半濁点
  const dakuten = 'ﾞ';
  const handakuten = 'ﾟ';
  
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
    const code = str.charCodeAt(i);
    
    // 半角カナの処理（濁点・半濁点の組み合わせ）
    if (i + 1 < str.length) {
      const nextChar = str.charAt(i + 1);
      if ((nextChar === dakuten || nextChar === handakuten) && 
          (char in hankakuKanaMap || hankakuKanaMap[char + nextChar])) {
        const combination = char + nextChar;
        if (hankakuKanaMap[combination]) {
          result += hankakuKanaMap[combination];
          i++; // 濁点・半濁点を処理したのでインデックスを進める
          continue;
        }
      }
    }
    
    // 半角カナの処理（単体）
    if (char in hankakuKanaMap) {
      result += hankakuKanaMap[char];
    }
    // 半角スペース（U+0020）は全角スペース（U+3000）に変換
    else if (code === 0x0020) {
      result += String.fromCharCode(0x3000);
    }
    // 半角英数字と記号（U+0021 - U+007E）の範囲を判定
    else if (code >= 0x0021 && code <= 0x007E) {
      // 半角から全角への変換（シフト値は0xFEE0）
      result += String.fromCharCode(code + 0xFEE0);
    } 
    // それ以外の文字はそのまま
    else {
      result += char;
    }
  }
  
  return result;
}