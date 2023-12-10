import { Article } from '@components/Article';
import { Heading } from '@components/HeadingLeveled';
import { Section } from '@components/Section';
import classNames from 'classnames';
import { HTMLAttributes, useState } from 'react';
import { useLocaleContext } from '../../context/LocalizationContext';
import styles from './graphqlApp.module.scss';
import { TSidePanelMode } from './types/TSidePanelMode';
import { DocsExplorer } from './ui/DocsExplorer';
import { History } from './ui/History';
import { RequestEditor } from './ui/RequestEditor';
import { ResponseSection } from './ui/ResponseSection';
import { Sidebar } from './ui/Sidebar';

export function GraphqlApp({
  className,
}: Readonly<HTMLAttributes<HTMLElement>>) {
  const { translate } = useLocaleContext();
  const [sidePanelMode, setSidePanelMode] = useState<TSidePanelMode>('none');

  const handleClick = () => {
    throw new Error('Handler not implemented');
  };

  const handleDocsClick = () => {
    setSidePanelMode((prev) => (prev === 'docs' ? 'none' : 'docs'));
  };

  const handleHistoryClick = () => {
    setSidePanelMode((prev) => (prev === 'history' ? 'none' : 'history'));
  };

  return (
    <Article className={classNames(className, styles.application)}>
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
