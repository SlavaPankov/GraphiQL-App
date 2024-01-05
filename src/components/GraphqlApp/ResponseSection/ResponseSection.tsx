import { Heading } from '@components/Heading';
import { Section } from '@components/Section';
import { useLocaleContext } from '@context/LocalizationContext';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import { Editor } from '../Editor';
import styles from './responseSection.module.scss';

export function ResponseSection({
  className,
}: Readonly<HTMLAttributes<HTMLElement>>) {
  const { translate } = useLocaleContext();

  return (
    <Section className={classNames(className, styles.responseSection)}>
      <Heading className="visually-hidden">
        {translate('Response Section')}
      </Heading>
      <Section className={styles.jsonViewerSection}>
        <Editor mode="response" />
      </Section>
    </Section>
  );
}
