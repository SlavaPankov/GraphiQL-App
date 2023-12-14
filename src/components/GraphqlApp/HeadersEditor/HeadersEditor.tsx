import { Heading } from '@components/Heading';
import { Section } from '@components/Section';
import { useLocaleContext } from '@context/LocalizationContext';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setGQLHeaders } from '@store/graphqlQueryData/graphqlQueryDataSlice';
import { HTMLAttributes } from 'react';
import styles from './headersEditor.module.scss';

export function HeadersEditor({
  className,
}: Readonly<HTMLAttributes<HTMLElement>>) {
  const { translate } = useLocaleContext();
  const dispatch = useAppDispatch();

  return (
    <Section className={className}>
      <Heading className="visually-hidden">
        {translate('Headers Editor')}
      </Heading>
      <textarea
        className={styles.headersEditorArea}
        placeholder={translate('Headers Editor')}
        rows={4}
        onChange={(e) => dispatch(setGQLHeaders(e.target.value))}
      />
    </Section>
  );
}
