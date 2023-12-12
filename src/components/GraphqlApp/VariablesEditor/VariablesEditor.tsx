import { Heading } from '@components/Heading';
import { Section } from '@components/Section';
import { useLocaleContext } from '@context/LocalizationContext';
import { HTMLAttributes } from 'react';
import styles from './variablesEditor.module.scss';

export function VariablesEditor({
  className,
}: Readonly<HTMLAttributes<HTMLElement>>) {
  const { translate } = useLocaleContext();

  return (
    <Section className={className}>
      <Heading className="visually-hidden">
        {translate('Variables Editor')}
      </Heading>
      <textarea
        className={styles.variablesEditorArea}
        placeholder={translate('Variables Editor')}
        rows={4}
      />
    </Section>
  );
}
