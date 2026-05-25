// HSK 1 weeks 3–6 + HSK 2 week 8 — question words.
// Question words stay in the slot the answer would occupy (wh-in-situ).
export default [
  { level: 'HSK1', category: 'phrase', word: '什么',      pinyin: 'shénme',       tones: [2,5], definition: 'what',                   context: '你叫什么名字？',   collocate: '什么名字', course: 'hsk1', week: 3, grammar_pattern_id: 'wh-in-situ' },
  { level: 'HSK1', category: 'phrase', word: '谁',        pinyin: 'shéi',         tones: [2],   definition: 'who',                    context: '他是谁？',         collocate: '是谁',     course: 'hsk1', week: 5, grammar_pattern_id: 'wh-in-situ' },
  { level: 'HSK1', category: 'phrase', word: '哪儿',      pinyin: 'nǎr',          tones: [3],   definition: 'where',                  context: '你在哪儿？',       collocate: '在哪儿',   course: 'hsk1', week: 5, grammar_pattern_id: 'wh-in-situ' },
  { level: 'HSK1', category: 'phrase', word: '几',        pinyin: 'jǐ',           tones: [3],   definition: 'how many (small, <10)',  context: '你有几本书？',     collocate: '几个',     course: 'hsk1', week: 5, grammar_pattern_id: 'wh-in-situ', contrast_set_id: 'ji-vs-duoshao' },
  { level: 'HSK1', category: 'phrase', word: '多少',      pinyin: 'duōshao',      tones: [1,5], definition: 'how many / how much',    context: '多少钱？',         collocate: '多少钱',   course: 'hsk1', week: 5, grammar_pattern_id: 'wh-in-situ', contrast_set_id: 'ji-vs-duoshao' },
  { level: 'HSK2', category: 'phrase', word: '为什么',    pinyin: 'wèishénme',    tones: [4,2,5], definition: 'why',                  context: '你为什么不来？',   collocate: '为什么',   course: 'hsk2', week: 8, grammar_pattern_id: 'wh-in-situ' },
  { level: 'HSK2', category: 'phrase', word: '怎么',      pinyin: 'zěnme',        tones: [3,5], definition: 'how',                    context: '你怎么来？',       collocate: '怎么说',   course: 'hsk2', week: 8, grammar_pattern_id: 'wh-in-situ' },
  { level: 'HSK2', category: 'phrase', word: '怎么样',    pinyin: 'zěnmeyàng',    tones: [3,5,4], definition: 'how about it / how is it', context: '这个怎么样？', collocate: '怎么样',   course: 'hsk2', week: 8, grammar_pattern_id: 'wh-in-situ' }
];
