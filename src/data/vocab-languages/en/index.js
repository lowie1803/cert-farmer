import core from '@data/vocab-b1b2.js';
import health from '@data/vocab-health.js';
import environment from '@data/vocab-environment.js';
import education from '@data/vocab-education.js';
import work from '@data/vocab-work.js';
import technology from '@data/vocab-technology.js';
import travel from '@data/vocab-travel.js';
import urban from '@data/vocab-urban.js';
import communication from '@data/vocab-communication.js';
import food from '@data/vocab-food.js';
import science from '@data/vocab-science.js';
import academicConnectors from '@data/vocab-academic-connectors.js';
import academicSkills from '@data/vocab-academic-skills.js';
import speakingPhrases from '@data/vocab-speaking-phrases.js';

const tag = (entries, topic) => entries.map((e) => ({ ...e, topic }));

const topics = [
  { key: 'core',                 label: 'Foundations',                    description: 'Core academic verbs, nouns, and connectors',                                       entries: tag(core, 'core') },
  { key: 'health',               label: 'Health & Lifestyle',             description: 'Exercise, diet, mental health, well-being',                                        entries: tag(health, 'health') },
  { key: 'environment',          label: 'Environment & Sustainability',   description: 'Pollution, climate, recycling, biodiversity',                                      entries: tag(environment, 'environment') },
  { key: 'education',            label: 'Education & Learning',           description: 'Study, university, lifelong learning',                                             entries: tag(education, 'education') },
  { key: 'work',                 label: 'Work & Careers',                 description: 'Workplace, remote work, burnout, promotion',                                       entries: tag(work, 'work') },
  { key: 'technology',           label: 'Technology & Internet',          description: 'Devices, social media, AI, privacy',                                               entries: tag(technology, 'technology') },
  { key: 'travel',               label: 'Travel & Culture',               description: 'Tourism, cross-cultural experience, language',                                     entries: tag(travel, 'travel') },
  { key: 'urban',                label: 'Urban Life & Transport',         description: 'Cities, commute, infrastructure, housing',                                         entries: tag(urban, 'urban') },
  { key: 'communication',        label: 'Communication & Relationships',  description: 'Family, friendship, conflict, media',                                              entries: tag(communication, 'communication') },
  { key: 'food',                 label: 'Food & Eating Habits',           description: 'Cuisine, nutrition, cooking, fast food',                                           entries: tag(food, 'food') },
  { key: 'science',              label: 'Science & Nature',               description: 'Research, animals, space, discoveries',                                            entries: tag(science, 'science') },
  { key: 'academic-connectors',  label: 'Academic Connectors',            description: 'Contrast, causality, addition, exemplification, conclusion markers',               entries: tag(academicConnectors, 'academic-connectors') },
  { key: 'academic-skills',      label: 'Academic Skills',                description: 'Cross-topic B2/C1 verbs, adjectives, and adverbs for IELTS/VSTEP essays',           entries: tag(academicSkills, 'academic-skills') },
  { key: 'speaking-phrases',     label: 'Speaking Phrases',               description: 'Opinion starters, hedges, discourse markers for IELTS Speaking',                   entries: tag(speakingPhrases, 'speaking-phrases') },
];

const en = {
  code: 'en',
  label: 'English',
  flag: '🇬🇧',
  levels: ['B1', 'B2', 'C1'],
  categories: ['verb', 'noun', 'adjective', 'adverb', 'phrase'],
  topics,
};

export default en;
