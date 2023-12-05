import { createContext, ReactNode, useMemo, useState } from 'react';

type Locale = 'ru' | 'en';

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

export function UseLocalizationContext({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('ru');

  const localizationProviderValue = useMemo(
    () => ({ locale, setLocale }),
    [locale, setLocale]
  );

  return (
    <localizationContext.Provider value={localizationProviderValue}>
      {children}
    </localizationContext.Provider>
  );
}
