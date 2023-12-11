import { createContext } from 'react';

export type Locale = 'ru' | 'en';

export interface ILocalizationContextData {
  locale: Locale;
  isFetching: boolean;
  setLocale: (data: Locale) => void;
  translate: (key: string) => string;
}

const localizationContextDefaultValue: ILocalizationContextData = {
  locale: 'ru',
  isFetching: false,
  setLocale: () => {},
  translate: () => '',
};

export const localizationContext = createContext<ILocalizationContextData>(
  localizationContextDefaultValue
);
