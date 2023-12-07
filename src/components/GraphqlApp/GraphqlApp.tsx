import { Article } from '@components/Article';
import { Heading } from '@components/HeadingLeveled';
import { Section } from '@components/Section';
import { useContext, useState } from 'react';
import { localizationContext } from '../../context/LocalizationContext';
import { SidePanelMode } from './enums/SidePanelMode';
import styles from './graphqlApp.module.scss';
import { Editors } from './ui/Editors';
import { SidePanel } from './ui/SidePanel';
import { Sidebar } from './ui/Sidebar';

export function GraphqlApp() {
  const { translate } = useContext(localizationContext);
  const [sidePanelMode, setSidePanelMode] = useState(SidePanelMode.NONE);

  const handleClick = () => {
    throw new Error('Handler not implemented');
  };

  const handleDocsClick = () => {
    setSidePanelMode((prev) =>
      prev === SidePanelMode.DOCS ? SidePanelMode.NONE : SidePanelMode.DOCS
    );
  };

  const handleHistoryClick = () => {
    setSidePanelMode((prev) =>
      prev === SidePanelMode.HISTORY
        ? SidePanelMode.NONE
        : SidePanelMode.HISTORY
    );
  };

  return (
    <Article className={styles.application}>
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
        <SidePanel mode={sidePanelMode} className={styles.sidePanel} />
        <Editors className={styles.editors} />
      </Section>
    </Article>
  );
}
