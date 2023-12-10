import { createContext } from 'react';

export type Locale = 'ru' | 'en';

export interface ILocalizationContextData {
  locale: Locale;
  setLocale: (data: Locale) => void;
  translate: (key: string) => string;
}

const localizationContextDefaultValue: ILocalizationContextData = {
  locale: 'ru',
  setLocale: () => {},
  translate: () => '',
};

export const localizationContext = createContext<ILocalizationContextData>(
  localizationContextDefaultValue
);
