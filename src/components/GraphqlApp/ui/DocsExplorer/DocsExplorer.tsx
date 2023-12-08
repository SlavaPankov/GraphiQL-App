import { Article } from '@components/Article';
import { Heading } from '@components/HeadingLeveled';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import { useLocaleContext } from '../../../../context/LocalizationContext';
import styles from './docsExplorer.module.scss';

export function DocsExplorer({
  className,
}: Readonly<HTMLAttributes<HTMLElement>>) {
  const { translate } = useLocaleContext();
  return (
    <Article className={classNames(className, styles.parent)}>
      <Heading>{translate('Docs')}</Heading>
      <div>content</div>
    </Article>
  );
}
