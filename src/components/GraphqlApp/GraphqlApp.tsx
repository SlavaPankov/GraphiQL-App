import { Article } from '@components/Article';
import { Heading } from '@components/Heading';
import { Section } from '@components/Section';
import { useLocaleContext } from '@context/LocalizationContext';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setGQLUrl } from '@store/graphqlQueryData/graphqlQueryDataSlice';
import classNames from 'classnames';
import { HTMLAttributes, lazy, Suspense, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLazyGetSchemaQuery } from '@store/graphqlApi/graphqlApi';
import { toast } from 'react-toastify';
import { ChangeEndpointDialog } from './ChangeEndpointDialog';
import { RequestEditor } from './RequestEditor';
import { ResponseSection } from './ResponseSection';
import { Sidebar } from './Sidebar';
import styles from './graphqlApp.module.scss';

const DocsExplorer = lazy(async () => {
  const module = await import('./DocsExplorer');
  return { default: module.DocsExplorer };
});

export function GraphqlApp({
  className,
}: Readonly<HTMLAttributes<HTMLElement>>) {
  const { translate } = useLocaleContext();
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isUrlDialogOpen, setIsUrlDialogOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [fetchSchema, { data: introspection }] = useLazyGetSchemaQuery();

  return (
    <Article
      className={classNames(
        className,
        styles.breakViewport,
        styles.application
      )}
    >
      <Heading className="visually-hidden">
        {translate('GraphQL Playground')}
      </Heading>

      <Sidebar
        isDocsOpen={isDocsOpen}
        handleDocsClick={async () => {
          if (isDocsOpen) {
            setIsDocsOpen(false);
          } else {
            const { isSuccess, isError } = await fetchSchema({});
            if (isError) {
              toast.error(translate('Bad request'));
            }
            setIsDocsOpen(isSuccess);
          }
        }}
        handleSettingsClick={() => {
          setIsUrlDialogOpen(true);
        }}
      />

      <Section className={styles.editorsSection}>
        <Heading className="visually-hidden">
          {translate('GraphQL Editors')}
        </Heading>

        {isUrlDialogOpen &&
          createPortal(
            <ChangeEndpointDialog
              handleDiscardClick={() => {
                setIsUrlDialogOpen(false);
              }}
              handleConfirmClick={({ endpoint }) => {
                dispatch(setGQLUrl(endpoint));
                setIsUrlDialogOpen(false);
              }}
            />,
            document.body
          )}
        {isDocsOpen && introspection && (
          <Suspense fallback="LOADING">
            <DocsExplorer
              className={styles.sidePanel}
              introspection={introspection}
            />
          </Suspense>
        )}

        <Section className={styles.editors}>
          <Heading className="visually-hidden">{translate('Editors')}</Heading>
          <RequestEditor className={styles.requestEditor} />
          <ResponseSection className={styles.responseSection} />
        </Section>
      </Section>
    </Article>
  );
}
