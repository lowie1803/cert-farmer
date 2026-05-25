// HSK 1 weeks 1–2 — pictographic components, first 20 characters, and the numbers.
// Component entries use category 'component' and add `appears_in`.
// Numbers and first chars are real vocabulary entries.
export default [
  // === 8 pictographic components (Week 1) ===
  { level: 'HSK1', category: 'component', word: '人', pinyin: 'rén',  tones: [2], definition: 'person',         context: 'pictograph: a person from the side', collocate: '中国人', course: 'hsk1', week: 1, appears_in: ['们','你','他','从','众','休'] },
  { level: 'HSK1', category: 'component', word: '口', pinyin: 'kǒu',  tones: [3], definition: 'mouth',          context: 'pictograph: an open mouth',         collocate: '人口',   course: 'hsk1', week: 1, appears_in: ['吃','喝','说','叫','名','知'] },
  { level: 'HSK1', category: 'component', word: '日', pinyin: 'rì',   tones: [4], definition: 'sun / day',      context: 'pictograph: the sun',               collocate: '今日',   course: 'hsk1', week: 1, appears_in: ['时','早','明','晚','春','是'] },
  { level: 'HSK1', category: 'component', word: '月', pinyin: 'yuè',  tones: [4], definition: 'moon / month',   context: 'pictograph: the crescent moon',     collocate: '一个月', course: 'hsk1', week: 1, appears_in: ['朋','期','朝','望'] },
  { level: 'HSK1', category: 'component', word: '木', pinyin: 'mù',   tones: [4], definition: 'tree / wood',    context: 'pictograph: tree with branches and roots', collocate: '木头', course: 'hsk1', week: 1, appears_in: ['林','森','校','树','本','来'] },
  { level: 'HSK1', category: 'component', word: '水', pinyin: 'shuǐ', tones: [3], definition: 'water',          context: 'pictograph: flowing streams (radical form 氵)', collocate: '一杯水', course: 'hsk1', week: 1, appears_in: ['河','湖','海','江','没','法'] },
  { level: 'HSK1', category: 'component', word: '山', pinyin: 'shān', tones: [1], definition: 'mountain',       context: 'pictograph: three peaks',           collocate: '山水',   course: 'hsk1', week: 1, appears_in: ['岛','岩','峰','出'] },
  { level: 'HSK1', category: 'component', word: '火', pinyin: 'huǒ',  tones: [3], definition: 'fire',           context: 'pictograph: a flame (radical 灬)',   collocate: '火车',   course: 'hsk1', week: 1, appears_in: ['灯','烧','热','然','照'] },

  // === Numbers (Week 2) ===
  { level: 'HSK1', category: 'noun', word: '一',   pinyin: 'yī',   tones: [1], definition: 'one',    context: '一本书。',         collocate: '一个',   course: 'hsk1', week: 2 },
  { level: 'HSK1', category: 'noun', word: '二',   pinyin: 'èr',   tones: [4], definition: 'two (in numbers/ordinals)', context: '十二月。', collocate: '第二',   course: 'hsk1', week: 2, contrast_set_id: 'liang-vs-er' },
  { level: 'HSK1', category: 'noun', word: '三',   pinyin: 'sān',  tones: [1], definition: 'three',  context: '三本书。',         collocate: '三个',   course: 'hsk1', week: 2 },
  { level: 'HSK1', category: 'noun', word: '四',   pinyin: 'sì',   tones: [4], definition: 'four',   context: '四个人。',         collocate: '四月',   course: 'hsk1', week: 2 },
  { level: 'HSK1', category: 'noun', word: '五',   pinyin: 'wǔ',   tones: [3], definition: 'five',   context: '五本书。',         collocate: '五月',   course: 'hsk1', week: 2 },
  { level: 'HSK1', category: 'noun', word: '六',   pinyin: 'liù',  tones: [4], definition: 'six',    context: '六个朋友。',       collocate: '六月',   course: 'hsk1', week: 2 },
  { level: 'HSK1', category: 'noun', word: '七',   pinyin: 'qī',   tones: [1], definition: 'seven',  context: '七本书。',         collocate: '七月',   course: 'hsk1', week: 2 },
  { level: 'HSK1', category: 'noun', word: '八',   pinyin: 'bā',   tones: [1], definition: 'eight',  context: '八个人。',         collocate: '八月',   course: 'hsk1', week: 2 },
  { level: 'HSK1', category: 'noun', word: '九',   pinyin: 'jiǔ',  tones: [3], definition: 'nine',   context: '九本书。',         collocate: '九月',   course: 'hsk1', week: 2 },
  { level: 'HSK1', category: 'noun', word: '十',   pinyin: 'shí',  tones: [2], definition: 'ten',    context: '十个人。',         collocate: '十月',   course: 'hsk1', week: 2 },
  { level: 'HSK1', category: 'noun', word: '百',   pinyin: 'bǎi',  tones: [3], definition: 'hundred',context: '一百本书。',       collocate: '一百',   course: 'hsk1', week: 2 },
  { level: 'HSK1', category: 'noun', word: '两',   pinyin: 'liǎng',tones: [3], definition: 'two (before measure words)', context: '两个人。', collocate: '两本书', course: 'hsk1', week: 2, contrast_set_id: 'liang-vs-er' },
  { level: 'HSK1', category: 'noun', word: '零',   pinyin: 'líng', tones: [2], definition: 'zero',   context: '一百零五。',       collocate: '零点',   course: 'hsk1', week: 2 },

  // === First 20 high-frequency characters (Week 2) ===
  // Pronouns and core function words are repeated in the dedicated topic files;
  // here we list the structural/identity ones first met as characters.
  { level: 'HSK1', category: 'adjective', word: '大', pinyin: 'dà',   tones: [4], definition: 'big',           context: '大山。',            collocate: '大人',   course: 'hsk1', week: 2 },
  { level: 'HSK1', category: 'adjective', word: '小', pinyin: 'xiǎo', tones: [3], definition: 'small',         context: '小山。',            collocate: '小心',   course: 'hsk1', week: 2 },
  { level: 'HSK1', category: 'noun',      word: '中', pinyin: 'zhōng',tones: [1], definition: 'middle / China',context: '中国。',            collocate: '中文',   course: 'hsk1', week: 2 },
  { level: 'HSK1', category: 'noun',      word: '国', pinyin: 'guó',  tones: [2], definition: 'country',       context: '中国。',            collocate: '中国',   course: 'hsk1', week: 2 },
  { level: 'HSK1', category: 'noun',      word: '中国', pinyin: 'Zhōngguó', tones: [1,2], definition: 'China', context: '我是中国人。',      collocate: '中国人', course: 'hsk1', week: 2 }
];
