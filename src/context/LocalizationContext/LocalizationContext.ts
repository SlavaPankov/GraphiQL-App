import { TLocale } from '@type/types/TLocale';
import { createContext, useContext } from 'react';

export interface ILocalizationContextData {
  locale: TLocale;
  isFetching: boolean;
  setLocale: (data: TLocale) => void;
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

export const useLocaleContext = () => useContext(localizationContext);
