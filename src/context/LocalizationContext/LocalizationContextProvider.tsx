import { useGetLocaleQuery } from '@store/localeApi/localeApi';
import { TLocale } from '@type/types/TLocale';
import { isLocale } from '@utils/typeguards/is-locale';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { localizationContext } from './LocalizationContext';

export function UseLocalizationContext({ children }: { children: ReactNode }) {
  const initialLocale = localStorage.getItem('lang');
  const [locale, setLocale] = useState<TLocale>(
    isLocale(initialLocale) ? initialLocale : 'ru'
  );
  const { data, isLoading, isFetching } = useGetLocaleQuery(locale);

  const translate = (key: string) => {
    if (!data?.[key]) {
      return key;
    }
    return data[key];
  };

  useEffect(() => {
    localStorage.setItem('lang', locale);
  }, [locale]);

  const localizationProviderValue = useMemo(
    () => ({ locale, setLocale, translate, isFetching }),
    [locale, setLocale, translate, isFetching]
  );

  return (
    <localizationContext.Provider value={localizationProviderValue}>
      {!isLoading && children}
    </localizationContext.Provider>
  );
}
