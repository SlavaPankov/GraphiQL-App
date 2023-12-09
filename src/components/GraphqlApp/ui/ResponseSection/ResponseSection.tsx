import { Heading } from '@components/HeadingLeveled';
import { Section } from '@components/Section';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import { useLocaleContext } from '../../../../context/LocalizationContext';
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
      <Section>
        <Heading className="visually-hidden">
          {translate('JSON Viewer')}
        </Heading>
      </Section>
    </Section>
  );
}
