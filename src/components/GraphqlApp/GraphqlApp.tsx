import { Article } from '@components/Article';
import { Heading } from '@components/Heading';
import { Section } from '@components/Section';
import { useLocaleContext } from '@context/LocalizationContext';
import { useAppDispatch } from '@hooks/useAppDispatch';
import {
  setGQLSDLIntrospection,
  setGQLUrl,
} from '@store/graphqlQueryData/graphqlQueryDataSlice';
import classNames from 'classnames';
import { HTMLAttributes, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLazyGetSchemaQuery } from '@store/graphqlApi/graphqlApi';
import { parseIntrospection } from '@utils/parseIntrospection';
import { ChangeEndpointDialog } from './ChangeEndpointDialog';
import { DocsExplorer } from './DocsExplorer';
import { RequestEditor } from './RequestEditor';
import { ResponseSection } from './ResponseSection';
import { Sidebar } from './Sidebar';
import styles from './graphqlApp.module.scss';

export function GraphqlApp({
  className,
}: Readonly<HTMLAttributes<HTMLElement>>) {
  const { translate } = useLocaleContext();
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isUrlDialogOpen, setIsUrlDialogOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [fetchSchema] = useLazyGetSchemaQuery();

  const updateSDLSchema = async () => {
    const response = await fetchSchema({});
    const introspection = await parseIntrospection(response.data);
    dispatch(setGQLSDLIntrospection(introspection));
  };

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
            await updateSDLSchema();
            setIsDocsOpen(true);
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
        {isDocsOpen && <DocsExplorer className={styles.sidePanel} />}

        <Section className={styles.editors}>
          <Heading className="visually-hidden">{translate('Editors')}</Heading>
          <RequestEditor className={styles.requestEditor} />
          <ResponseSection className={styles.responseSection} />
        </Section>
      </Section>
    </Article>
  );
}
