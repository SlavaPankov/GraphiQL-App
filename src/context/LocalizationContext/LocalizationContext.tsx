import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { useGetLocaleQuery } from '../../store/localeApi/localeApi';
import { Locale } from 'src/types/types/Locale';
import { isLocale } from '@utils/typeguards/is-locale';

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

export function UseLocalizationContext({ children }: { children: ReactNode }) {
  const initialLocale = localStorage.getItem('lang');
  const [locale, setLocale] = useState<Locale>(
    isLocale(initialLocale) ? initialLocale : 'ru'
  );
  const { data, isLoading } = useGetLocaleQuery(locale);
  const translate = (key: string) => {
    if (!data) {
      return key;
    }

    return data[key];
  };

  const localizationProviderValue = useMemo(
    () => ({ locale, setLocale, translate }),
    [locale, setLocale, translate]
  );

  useEffect(() => {
    localStorage.setItem('lang', locale);
  }, [locale]);

  return (
    <localizationContext.Provider value={localizationProviderValue}>
      {!isLoading && children}
    </localizationContext.Provider>
  );
}
