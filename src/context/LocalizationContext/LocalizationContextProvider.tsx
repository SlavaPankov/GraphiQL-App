import { ReactNode, useMemo, useState } from 'react';
import { Locale, localizationContext } from './LocalizationContext';

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
