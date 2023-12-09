import { Heading } from '@components/HeadingLeveled';
import { Section } from '@components/Section';
import { HTMLAttributes } from 'react';
import { useLocaleContext } from '../../../../context/LocalizationContext';
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
        defaultValue={translate('Variables Editor')}
        rows={4}
      />
    </Section>
  );
}
