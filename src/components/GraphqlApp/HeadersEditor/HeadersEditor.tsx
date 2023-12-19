import { Heading } from '@components/Heading';
import { Section } from '@components/Section';
import { useLocaleContext } from '@context/LocalizationContext';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { setGQLHeaders } from '@store/graphqlQueryData/graphqlQueryDataSlice';
import { HTMLAttributes } from 'react';
import styles from './headersEditor.module.scss';

export function HeadersEditor({
  className,
}: Readonly<HTMLAttributes<HTMLElement>>) {
  const { translate } = useLocaleContext();
  const dispatch = useAppDispatch();
  const headers = useAppSelector((state) => {
    const value = JSON.stringify(state.graphqlQueryData.headers, null, 2);
    return value === '{}' ? '' : value;
  });

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
        defaultValue={headers}
      />
    </Section>
  );
}
