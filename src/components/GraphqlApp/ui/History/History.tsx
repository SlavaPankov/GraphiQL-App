import { Heading } from '@components/HeadingLeveled';
import { Section } from '@components/Section';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import { useLocaleContext } from '../../../../context/LocalizationContext';
import styles from './history.module.scss';

export function History({ className }: Readonly<HTMLAttributes<HTMLElement>>) {
  const { translate } = useLocaleContext();

  return (
    <Section className={classNames(className, styles.parent)}>
      <Heading>{translate('History')}</Heading>
      <div>content</div>
    </Section>
  );
}
