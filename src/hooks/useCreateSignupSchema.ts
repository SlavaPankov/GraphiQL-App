import { useContext, useEffect, useState } from 'react';
import { localizationContext } from '@context/LocalizationContext';
import { createSignupSchema } from '@utils/createSignupSchema.ts';

export function useCreateSignupSchema(isSignup: boolean) {
  const { locale, translate, isFetching } = useContext(localizationContext);
  const [schema, setSchema] = useState(createSignupSchema(translate, isSignup));

  useEffect(() => {
    if (isFetching) {
      return;
    }

    setSchema(createSignupSchema(translate, isSignup));
  }, [locale, isFetching]);

  return { schema };
}
