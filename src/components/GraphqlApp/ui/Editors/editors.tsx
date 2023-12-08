import { Heading } from '@components/HeadingLeveled';
import { Section } from '@components/Section';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import { useLocaleContext } from '../../../../context/LocalizationContext';
import styles from './editors.module.scss';

/*
  request editor (query editor / JSON viewer) (редакторы/слева)
  variables editor (редакторы/нижняя панель)
  headers editor (редакторы/нижняя панель)
  response section (query editor / JSON viewer) (редакторы/справа)
*/

export function Editors({ className }: Readonly<HTMLAttributes<HTMLElement>>) {
  const { translate } = useLocaleContext();
  return (
    <Section className={classNames(className, styles.editors)}>
      <Heading className="visually-hidden">{translate('Editors')}</Heading>
      <Section className={styles.queryEditor}>
        <Heading>белый кусок (GQL)</Heading>
        <div>request editor (GQL)</div>
        <div>variables/headers editor</div>
      </Section>
      <Section className={styles.jsonViewer}>
        <Heading>прозрачный кусок (JSON)</Heading>
      </Section>
    </Section>
  );
}
