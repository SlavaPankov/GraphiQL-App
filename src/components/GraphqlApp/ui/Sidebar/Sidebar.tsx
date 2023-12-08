import { SidePanelMode } from '@components/GraphqlApp/enums/SidePanelMode';
import { MouseEventHandler, useContext } from 'react';
import { localizationContext } from '../../../../context/LocalizationContext';
import { GQLAppButton } from '../../../IconButton';
import {
  DocsSVGIcon,
  HistorySVGIcon,
  KeyboardShortcutSVGIcon,
  ReloadSVGIcon,
  SettingsSVGIcon,
} from '../../../IconButton/icons';
import styles from './sidebar.module.scss';

interface ISidebarProps {
  sidePanelMode: SidePanelMode;
  handleDocsClick: MouseEventHandler<HTMLButtonElement>;
  handleHistoryClick: MouseEventHandler<HTMLButtonElement>;
  handleReloadClick: MouseEventHandler<HTMLButtonElement>;
  handleKeyboardShortcutClick: MouseEventHandler<HTMLButtonElement>;
  handleSettingsClick: MouseEventHandler<HTMLButtonElement>;
}

/*
  possibility to change to a different user-specified API endpoint (куда-нибудь в сайдбар)
*/

export function Sidebar({
  sidePanelMode,
  handleDocsClick,
  handleHistoryClick,
  handleReloadClick,
  handleKeyboardShortcutClick,
  handleSettingsClick,
}: Readonly<ISidebarProps>) {
  const { translate } = useContext(localizationContext);

  return (
    <aside className={styles.sideBar}>
      <div className={styles.buttonSection}>
        <GQLAppButton
          icon={<DocsSVGIcon isActive={sidePanelMode === SidePanelMode.DOCS} />}
          title={translate('Documentation Explorer')}
          onClick={handleDocsClick}
          isActive={sidePanelMode === SidePanelMode.DOCS}
        />
        <GQLAppButton
          icon={<HistorySVGIcon />}
          title={translate('History')}
          onClick={handleHistoryClick}
          isActive={sidePanelMode === SidePanelMode.HISTORY}
        />
      </div>
      <div className={styles.buttonSection}>
        <GQLAppButton
          icon={<ReloadSVGIcon />}
          title={translate('Re-fetch GraphQL schema')}
          onClick={handleReloadClick}
        />
        <GQLAppButton
          icon={<KeyboardShortcutSVGIcon />}
          title={translate('Short keys')}
          onClick={handleKeyboardShortcutClick}
        />
        <GQLAppButton
          icon={<SettingsSVGIcon />}
          title={translate('Settings dialog')}
          onClick={handleSettingsClick}
        />
      </div>
    </aside>
  );
}
