import { Dispatch, SetStateAction, createContext, useContext } from 'react';
import { Locale } from '../../types/types/Locale';

export interface ILocalizationContextData {
  locale: Locale;
  setLocale: Dispatch<SetStateAction<Locale>>;
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

export const useLocaleContext = () => useContext(localizationContext);
