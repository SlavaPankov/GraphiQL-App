import { Article } from '@components/Article';
import { Heading } from '@components/Heading';
import { useLocaleContext } from '@context/LocalizationContext';
import { useAppSelector } from '@hooks/useAppSelector';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import styles from './docsExplorer.module.scss';

export function DocsExplorer({
  className,
}: Readonly<HTMLAttributes<HTMLElement>>) {
  const { translate } = useLocaleContext();
  const data = useAppSelector((state) => state.graphqlQueryData.schema);
  return (
    <Article className={classNames(className, styles.docsExplorerSection)}>
      <Heading>{translate('Docs')}</Heading>
      <div>content</div>
      <pre>{data}</pre>
    </Article>
  );
}
