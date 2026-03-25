import ccnaGlossary, { glossaryCategories as ccnaCategories } from './glossary';
import financeGlossary, { glossaryCategories as financeCategories } from './glossary-stock-finance';
import javaGlossary, { glossaryCategories as javaCategories } from './glossary-java';

const glossaries = {
  ccna: ccnaGlossary,
  'stock-finance': financeGlossary,
  java: javaGlossary,
};

const categories = {
  ccna: ccnaCategories,
  'stock-finance': financeCategories,
  java: javaCategories,
};

export const getGlossary = (courseId) => glossaries[courseId] || {};
export const getGlossaryCategories = (courseId) => categories[courseId] || ['All'];
export const hasGlossary = (courseId) => courseId in glossaries;
