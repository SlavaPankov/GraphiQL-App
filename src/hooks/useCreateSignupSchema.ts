import { useContext, useEffect, useState } from 'react';
import { localizationContext } from '@context/LocalizationContext';
import { createSignupSchema } from '@utils/createSignupSchema.ts';

export function useCreateSignupSchema() {
  const { locale, translate, isFetching } = useContext(localizationContext);
  const [schema, setSchema] = useState(createSignupSchema(translate));

  useEffect(() => {
    if (isFetching) {
      return;
    }

    setSchema(createSignupSchema(translate));
  }, [locale, isFetching]);

  return { schema };
}
