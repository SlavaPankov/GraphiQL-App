import { createContext } from 'react';

export type Locale = 'ru' | 'en';

export interface ILocalizationContextData {
  locale: Locale;
  setLocale: (data: Locale) => void;
}

const localizationContextDefaultValue: ILocalizationContextData = {
  locale: 'ru',
  setLocale: () => {},
};

export const localizationContext = createContext<ILocalizationContextData>(
  localizationContextDefaultValue
);

