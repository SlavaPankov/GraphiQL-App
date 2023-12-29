import { Article } from '@components/Article';
import { Heading } from '@components/Heading';
import { useLocaleContext } from '@context/LocalizationContext';
import { useAppSelector } from '@hooks/useAppSelector';
import classNames from 'classnames';
import { HTMLAttributes, Suspense } from 'react';
import { Await } from 'react-router-dom';
import { parseSchema } from '@utils/gqlSchemaService';
import styles from './docsExplorer.module.scss';

export function DocsExplorer({
  className,
}: Readonly<HTMLAttributes<HTMLElement>>) {
  const { translate } = useLocaleContext();
  const schema = useAppSelector((state) => state.graphqlQueryData.schema);

  const parsedSchema = parseSchema(schema);
  return (
    <Article
      className={classNames(className, styles.docsExplorerSection)}
      testId="docs-explorer"
    >
      <Heading>{translate('Docs')}</Heading>
      <Suspense fallback="LOADING">
        <Await resolve={parsedSchema}>
          {({ queryType, types }: Awaited<typeof parsedSchema>) => (
            <>
              Root Types:
              <div>query: {queryType.name}</div>
              All Schema Types:
              <pre>
                {types.map(({ name, kind }) => `${name}: ${kind}`).join('\n')}
              </pre>
            </>
          )}
        </Await>
      </Suspense>
    </Article>
  );
}
