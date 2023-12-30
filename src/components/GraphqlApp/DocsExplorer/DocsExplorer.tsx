import { Article } from '@components/Article';
import { Heading } from '@components/Heading';
import { useLocaleContext } from '@context/LocalizationContext';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import { IntrospectionQuery, IntrospectionSchema } from 'graphql/utilities';
import styles from './docsExplorer.module.scss';

function QueryType({ kind, name }: IntrospectionSchema['queryType']) {
  return (
    <div>
      {kind}:{name}
    </div>
  );
}

export function DocsExplorer({
  className,
  __schema,
}: Readonly<HTMLAttributes<HTMLElement> & IntrospectionQuery>) {
  const { translate } = useLocaleContext();
  // const introspection = useAppSelector(
  //   (state) => state.graphqlQueryData.sdlIntrospection
  // );
  // console.log(introspection);

  const { queryType } = __schema;

  return (
    <Article
      className={classNames(className, styles.docsExplorerSection)}
      testId="docs-explorer"
    >
      <Heading>{translate('Docs')}</Heading>
      <QueryType {...queryType} />
      {/* <Suspense fallback="LOADING"> */}
      {/*  <Await resolve={parsedSchema}> */}
      {/*    {({ queryType, types }: Awaited<typeof parsedSchema>) => ( */}
      {/*      // <DocsObject {...types[0]} /> */}
      {/*      /* <> */}
      {/*        Root Types: */}
      {/*        <div>query: {queryType.name}</div> */}
      {/*        All Schema Types: */}
      {/*        <pre> */}
      {/*          {types.map(({ name, kind }) => `${name}: ${kind}`).join('\n')} */}
      {/*        </pre> */}
      {/*      </> */}
      {/*    )} */}
      {/*  </Await> */}
      {/* </Suspense> */}
    </Article>
  );
}
