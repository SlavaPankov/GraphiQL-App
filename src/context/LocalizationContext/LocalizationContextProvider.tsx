import { isLocale } from '@utils/typeguards/is-locale';
import { ReactNode, useMemo, useState } from 'react';
import { useGetLocaleQuery } from '../../store/localeApi/localeApi';
import { Locale } from '../../types/types/Locale';
import { localizationContext } from './LocalizationContext';

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

  return (
    <localizationContext.Provider value={localizationProviderValue}>
      {!isLoading && children}
    </localizationContext.Provider>
  );
}
