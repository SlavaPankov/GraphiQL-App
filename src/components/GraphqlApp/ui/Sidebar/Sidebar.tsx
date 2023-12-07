import { MouseEventHandler, useContext } from 'react';
import styles from './sidebar.module.scss';
import {
  DocsSVGIcon,
  HistorySVGIcon,
  KeyboardShortcutSVGIcon,
  ReloadSVGIcon,
  SettingsSVGIcon,
} from '../GQLAppButton/icons';
import { localizationContext } from '../../../../context/LocalizationContext';
import { GQLAppButton } from '../GQLAppButton';

interface ISidebarProps {
  handleDocsClick: MouseEventHandler<HTMLButtonElement>;
  handleHistoryClick: MouseEventHandler<HTMLButtonElement>;
  handleReloadClick: MouseEventHandler<HTMLButtonElement>;
  handleKeyboardShortcutClick: MouseEventHandler<HTMLButtonElement>;
  handleSettingsClick: MouseEventHandler<HTMLButtonElement>;
}

export function Sidebar({
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
          icon={<DocsSVGIcon />}
          title={translate('Documentation Explorer')}
          onClick={handleDocsClick}
        />
        <GQLAppButton
          icon={<HistorySVGIcon />}
          title={translate('History')}
          onClick={handleHistoryClick}
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
