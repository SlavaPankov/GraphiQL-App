import { TLocale } from '@type/types/TLocale';

export const isLocale = (locale: unknown): locale is TLocale =>
  typeof locale === 'string' && ['en', 'ru'].includes(locale);
