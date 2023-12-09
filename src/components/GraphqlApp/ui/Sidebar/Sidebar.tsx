import { TSidePanelMode } from '@components/GraphqlApp/types/TSidePanelMode';
import { IconButton } from '@components/IconButton';
import {
  DocsSVGIcon,
  HistorySVGIcon,
  KeyboardShortcutSVGIcon,
  ReloadSVGIcon,
  SettingsSVGIcon,
} from '@components/IconButton/icons';
import { MouseEventHandler } from 'react';
import { useLocaleContext } from '../../../../context/LocalizationContext';
import styles from './sidebar.module.scss';

interface ISidebarProps {
  sidePanelMode: TSidePanelMode;
  handleDocsClick: MouseEventHandler<HTMLButtonElement>;
  handleHistoryClick: MouseEventHandler<HTMLButtonElement>;
  handleReloadClick: MouseEventHandler<HTMLButtonElement>;
  handleKeyboardShortcutClick: MouseEventHandler<HTMLButtonElement>;
  handleSettingsClick: MouseEventHandler<HTMLButtonElement>;
}

export function Sidebar({
  sidePanelMode,
  handleDocsClick,
  handleHistoryClick,
  handleReloadClick,
  handleKeyboardShortcutClick,
  handleSettingsClick,
}: Readonly<ISidebarProps>) {
  const { translate } = useLocaleContext();

  return (
    <aside className={styles.sideBar}>
      <div className={styles.buttonSection}>
        <IconButton
          icon={<DocsSVGIcon isActive={sidePanelMode === 'docs'} />}
          title={translate('Documentation Explorer')}
          onClick={handleDocsClick}
          isActive={sidePanelMode === 'docs'}
        />
        <IconButton
          icon={<HistorySVGIcon />}
          title={translate('History')}
          onClick={handleHistoryClick}
          isActive={sidePanelMode === 'history'}
        />
      </div>
      <div className={styles.buttonSection}>
        <IconButton
          icon={<ReloadSVGIcon />}
          title={translate('Re-fetch GraphQL schema')}
          onClick={handleReloadClick}
        />
        <IconButton
          icon={<KeyboardShortcutSVGIcon />}
          title={translate('Short keys')}
          onClick={handleKeyboardShortcutClick}
        />
        <IconButton
          icon={<SettingsSVGIcon />}
          title={translate('Settings dialog')}
          onClick={handleSettingsClick}
        />
      </div>
    </aside>
  );
}
