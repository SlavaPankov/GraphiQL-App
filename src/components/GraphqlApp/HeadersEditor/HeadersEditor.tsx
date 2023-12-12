import { Heading } from '@components/Heading';
import { Section } from '@components/Section';
import { useLocaleContext } from '@context/LocalizationContext';
import { HTMLAttributes } from 'react';
import styles from './headersEditor.module.scss';

export function HeadersEditor({
  className,
}: Readonly<HTMLAttributes<HTMLElement>>) {
  const { translate } = useLocaleContext();

  return (
    <Section className={className}>
      <Heading className="visually-hidden">
        {translate('Headers Editor')}
      </Heading>
      <textarea
        className={styles.headersEditorArea}
        placeholder={translate('Headers Editor')}
        rows={4}
      />
    </Section>
  );
}
