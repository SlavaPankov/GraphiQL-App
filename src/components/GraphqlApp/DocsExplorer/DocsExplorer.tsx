import { Article } from '@components/Article';
import { Heading } from '@components/Heading';
import { useLocaleContext } from '@context/LocalizationContext';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import {
  buildClientSchema,
  IntrospectionQuery,
  printSchema,
} from 'graphql/utilities';
import styles from './docsExplorer.module.scss';

interface IDocsExplorerProps extends HTMLAttributes<HTMLElement> {
  introspection: IntrospectionQuery;
}

export function DocsExplorer({
  className,
  introspection,
}: Readonly<IDocsExplorerProps>) {
  const { translate } = useLocaleContext();

  return (
    <Article
      className={classNames('scrollbar', className, styles.docsExplorerSection)}
      testId="docs-explorer"
    >
      <Heading>{translate('Docs')}</Heading>
      <pre className={styles.introspection}>
        {printSchema(buildClientSchema(introspection))
          .replace(/"{6}\n/g, '')
          .replace(/"{3}/g, '"')}
      </pre>
    </Article>
  );
}

/*

  """
  The gender of the character ('Female', 'Male', 'Genderless' or 'unknown').
  """
* */
