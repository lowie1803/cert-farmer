import components from './topics/components.js';
import pronouns from './topics/pronouns.js';
import greetings from './topics/greetings.js';
import identity from './topics/identity.js';
import description from './topics/description.js';
import family from './topics/family.js';
import actions from './topics/actions.js';
import foodDrink from './topics/food-drink.js';
import timeDate from './topics/time-date.js';
import placesTransport from './topics/places-transport.js';
import measureWords from './topics/measure-words.js';
import questionWords from './topics/question-words.js';
import particlesConjunctions from './topics/particles-conjunctions.js';
import ongoingChange from './topics/ongoing-change.js';
import experientialPast from './topics/experiential-past.js';
import comparison from './topics/comparison.js';
import manner from './topics/manner.js';
import modals from './topics/modals.js';
import connectives from './topics/connectives.js';
import weather from './topics/weather.js';
import shoppingMoney from './topics/shopping-money.js';
import duration from './topics/duration.js';

const tag = (entries, topic) => entries.map((e) => ({ ...e, topic }));

const topics = [
  // HSK 1 — fully authored
  { key: 'components',             label: 'Components & First Characters', description: 'HSK 1 weeks 1–2 — pictographic components, numbers, and the first 20 high-frequency characters.', entries: tag(components, 'components') },
  { key: 'pronouns',               label: 'Pronouns',                       description: 'HSK 1 week 3 — personal pronouns and the plural marker 们.',                                      entries: tag(pronouns, 'pronouns') },
  { key: 'greetings',              label: 'Greetings & Glue',               description: 'HSK 1 week 3 — 你好, 谢谢, 再见 and other conversational glue.',                                  entries: tag(greetings, 'greetings') },
  { key: 'identity',               label: 'Identity & 是 sentences',         description: 'HSK 1 week 3 — 学生, 老师, 朋友, 名字, and the 是 / 的 grammar pattern.',                          entries: tag(identity, 'identity') },
  { key: 'description',            label: 'Description (very 很)',           description: 'HSK 1 week 4 — descriptive adjectives that take 很, not 是.',                                     entries: tag(description, 'description') },
  { key: 'family',                 label: 'Family',                         description: 'HSK 1 week 4 — 爸爸, 妈妈, 哥哥, 姐姐, 弟弟, 妹妹 and friends.',                                   entries: tag(family, 'family') },
  { key: 'actions',                label: 'Actions (verbs)',                description: 'HSK 1 week 5 — core verbs: 是, 有, 去, 看, 吃, 喝, 想, 说, 做.',                                   entries: tag(actions, 'actions') },
  { key: 'food-drink',             label: 'Food & Drink',                   description: 'HSK 1 week 5 — common objects of 吃 and 喝.',                                                    entries: tag(foodDrink, 'food-drink') },
  { key: 'time-date',              label: 'Time & Date',                    description: 'HSK 1 week 6 — today, weekdays, clock time, the 两 vs 二 measure-word trap.',                    entries: tag(timeDate, 'time-date') },
  { key: 'measure-words',          label: 'Measure Words',                  description: 'HSK 1 week 6 — 个, 本, 杯, 张, 件, 口, 块 and friends.',                                          entries: tag(measureWords, 'measure-words') },
  { key: 'places-transport',       label: 'Places & Transport',             description: 'HSK 1 week 7 — 学校, 商店, 北京, 飞机, 火车; 坐 vs 开.',                                          entries: tag(placesTransport, 'places-transport') },
  { key: 'question-words',         label: 'Question Words',                 description: 'HSK 1–2 — 什么, 谁, 哪儿, 几, 多少, 为什么, 怎么 — all stay in place (wh-in-situ).',                  entries: tag(questionWords, 'question-words') },
  { key: 'particles-conjunctions', label: 'Particles & Conjunctions',       description: 'HSK 1 — 了, 也, 都, 和, 吗, 呢, 吧 and intensifiers.',                                            entries: tag(particlesConjunctions, 'particles-conjunctions') },

  // HSK 2 — week 1 fully authored, rest are stub previews
  { key: 'ongoing-change',         label: 'Ongoing & Change of State',      description: 'HSK 2 week 1 — 在, 正在, 已经, change-of-state 了.',                                              entries: tag(ongoingChange, 'ongoing-change') },
  { key: 'experiential-past',      label: 'Experiential Past — stub',       description: 'HSK 2 week 2 — 过 and time-reference words. Cluster is in progress.',                            entries: tag(experientialPast, 'experiential-past') },
  { key: 'comparison',             label: 'Comparison — stub',              description: 'HSK 2 week 3 — 比 and comparison adjectives. Cluster is in progress.',                           entries: tag(comparison, 'comparison') },
  { key: 'manner',                 label: 'Manner & 得 — stub',              description: 'HSK 2 week 4 — degree complement vocab. Cluster is in progress.',                               entries: tag(manner, 'manner') },
  { key: 'modals',                 label: 'Modals (会/能/可以) — stub',       description: 'HSK 2 weeks 5–6 — modal verbs and activities. Cluster is in progress.',                         entries: tag(modals, 'modals') },
  { key: 'connectives',            label: 'Connectives — stub',             description: 'HSK 2 week 7 — 因为/所以, 但是, 如果. Cluster is in progress.',                                   entries: tag(connectives, 'connectives') },
  { key: 'weather',                label: 'Weather — stub',                 description: 'HSK 2 week 8 — 天气, 晴, 阴, 雨, 雪. Cluster is in progress.',                                    entries: tag(weather, 'weather') },
  { key: 'shopping-money',         label: 'Shopping & Money — stub',        description: 'HSK 2 week 8 — 买, 卖, 钱, 块. Cluster is in progress.',                                          entries: tag(shoppingMoney, 'shopping-money') },
  { key: 'duration',               label: 'Duration — stub',                description: 'HSK 2 week 9 — time-duration vocab. Cluster is in progress.',                                    entries: tag(duration, 'duration') },
];

const zh = {
  code: 'zh',
  label: '中文 (Chinese)',
  flag: '🇨🇳',
  levels: ['HSK1', 'HSK2', 'HSK3', 'HSK4', 'HSK5', 'HSK6'],
  categories: ['verb', 'noun', 'adjective', 'adverb', 'phrase', 'component'],
  topics,
};

export default zh;
