import { Heading } from '@components/Heading';
import { Section } from '@components/Section';
import { useLocaleContext } from '@context/LocalizationContext';
import { useAppSelector } from '@hooks/useAppSelector';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import styles from './responseSection.module.scss';

export function ResponseSection({
  className,
}: Readonly<HTMLAttributes<HTMLElement>>) {
  const { translate } = useLocaleContext();
  const data = useAppSelector((state) => state.graphqlQueryData.response);

  return (
    <Section className={classNames(className, styles.responseSection)}>
      <Heading className="visually-hidden">
        {translate('Response Section')}
      </Heading>
      <Section className={styles.jsonViewerSection}>
        <Heading className="visually-hidden">
          {translate('JSON Viewer')}
        </Heading>
        <textarea
          className={styles.jsonViewerArea}
          placeholder={translate('JSON Viewer')}
          readOnly
          value={data}
        />
      </Section>
    </Section>
  );
}
