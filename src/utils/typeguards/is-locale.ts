import { Locale } from 'src/types/types/Locale';

export const isLocale = (locale: unknown): locale is Locale => {
  return typeof locale === 'string' && ['en', 'ru'].includes(locale);
};
