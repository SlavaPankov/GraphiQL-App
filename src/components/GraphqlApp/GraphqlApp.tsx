import { Article } from '@components/Article';
import { Heading } from '@components/Heading';
import { Section } from '@components/Section';
import { useLocaleContext } from '@context/LocalizationContext';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useLazyGetSchemaQuery } from '@store/graphqlApi/graphqlApi';
import { setGQLSchema } from '@store/graphqlQueryData/graphqlQueryDataSlice';
import { TSidePanelMode } from '@type/types/TSidePanelMode';
import classNames from 'classnames';
import { HTMLAttributes, useState } from 'react';
import { toast } from 'react-toastify';
import { DocsExplorer } from './DocsExplorer';
import { History } from './History';
import { RequestEditor } from './RequestEditor';
import { ResponseSection } from './ResponseSection';
import { Sidebar } from './Sidebar';
import styles from './graphqlApp.module.scss';

export function GraphqlApp({
  className,
}: Readonly<HTMLAttributes<HTMLElement>>) {
  const { translate } = useLocaleContext();
  const [sidePanelMode, setSidePanelMode] = useState<TSidePanelMode>('none');
  const dispatch = useAppDispatch();
  const [fetchSchema] = useLazyGetSchemaQuery();

  const handleClick = () => {
    toast('Handler not implemented');
  };

  const handleDocsClick = async () => {
    if (sidePanelMode !== 'docs') {
      const { data } = await fetchSchema({});
      dispatch(setGQLSchema(JSON.stringify(data, null, 2)));
      setSidePanelMode('docs');
    } else {
      setSidePanelMode('none');
    }
  };

  const handleHistoryClick = () => {
    setSidePanelMode((prev) => (prev === 'history' ? 'none' : 'history'));
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
        sidePanelMode={sidePanelMode}
        handleDocsClick={handleDocsClick}
        handleHistoryClick={handleHistoryClick}
        handleReloadClick={handleClick}
        handleKeyboardShortcutClick={handleClick}
        handleSettingsClick={handleClick}
      />

      <Section className={styles.editorsSection}>
        <Heading className="visually-hidden">
          {translate('GraphQL Editors')}
        </Heading>

        {sidePanelMode === 'docs' && (
          <DocsExplorer className={styles.sidePanel} />
        )}
        {sidePanelMode === 'history' && (
          <History className={styles.sidePanel} />
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
