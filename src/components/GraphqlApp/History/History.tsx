import { Heading } from '@components/Heading';
import { Section } from '@components/Section';
import { useLocaleContext } from '@context/LocalizationContext';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import styles from './history.module.scss';

export function History({ className }: Readonly<HTMLAttributes<HTMLElement>>) {
  const { translate } = useLocaleContext();

  return (
    <Section className={classNames(className, styles.historySection)}>
      <Heading>{translate('History')}</Heading>
      <div>content</div>
    </Section>
  );
}
