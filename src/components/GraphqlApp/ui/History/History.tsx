import { Heading } from '@components/HeadingLeveled';
import { Section } from '@components/Section';
import { HTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './history.module.scss';

export function History({ className }: Readonly<HTMLAttributes<HTMLElement>>) {
  return (
    <Section className={classNames(className, styles.parent)}>
      <Heading>History</Heading>
      <div>content</div>
    </Section>
  );
}
