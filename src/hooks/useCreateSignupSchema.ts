import { useContext, useEffect, useState } from 'react';
import { localizationContext } from '@context/LocalizationContext';
import { createSchema } from '@utils/createSchema';

export function useCreateSignupSchema(isSignup: boolean) {
  const { locale, translate, isFetching } = useContext(localizationContext);
  const [schema, setSchema] = useState(createSchema(translate, isSignup));

  useEffect(() => {
    if (isFetching) {
      return;
    }

    setSchema(createSchema(translate, isSignup));
  }, [locale, isFetching]);

  return { schema };
}
