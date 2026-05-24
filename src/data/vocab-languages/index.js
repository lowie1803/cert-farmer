import en from './en/index.js';
import zh from './zh/index.js';

export const LANGUAGES = [en, zh];

export const DEFAULT_LANG = 'en';

export function getLanguage(code) {
  return LANGUAGES.find((l) => l.code === code) ?? null;
}
