import { useContext, useEffect, useState } from 'react';
import { localizationContext } from '@context/LocalizationContext';
import { createSignupSchema } from '@utils/createSignupSchema.ts';

export function useCreateSignupSchema() {
  const { locale, translate } = useContext(localizationContext);
  const [schema, setSchema] = useState(createSignupSchema(translate));

  useEffect(() => {
    setSchema(createSignupSchema(translate));
  }, [locale]);

  return { schema };
}
