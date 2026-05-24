import foundations from './topics/foundations.js';

const tag = (entries, topic) => entries.map((e) => ({ ...e, topic }));

// TODO: more topic sets land here as content is authored (HSK2+, themed sets, etc.)
const topics = [
  {
    key: 'foundations',
    label: 'Foundations (placeholder)',
    description: 'Sample HSK1 entries — real content lands later.',
    entries: tag(foundations, 'foundations'),
  },
];

const zh = {
  code: 'zh',
  label: '中文 (Chinese)',
  flag: '🇨🇳',
  levels: ['HSK1', 'HSK2', 'HSK3', 'HSK4', 'HSK5', 'HSK6'],
  categories: ['verb', 'noun', 'adjective', 'adverb', 'phrase'],
  topics,
};

export default zh;
