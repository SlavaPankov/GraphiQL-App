import { IconButton } from '@components/IconButton';
import { DocsSVGIcon, SettingsSVGIcon } from '@components/IconButton/icons';
import { useLocaleContext } from '@context/LocalizationContext';
import { MouseEventHandler } from 'react';
import styles from './sidebar.module.scss';

interface ISidebarProps {
  isDocsOpen: boolean;
  handleDocsClick: MouseEventHandler<HTMLButtonElement>;
  handleSettingsClick: MouseEventHandler<HTMLButtonElement>;
}

export function Sidebar({
  isDocsOpen,
  handleDocsClick,
  handleSettingsClick,
}: Readonly<ISidebarProps>) {
  const { translate } = useLocaleContext();

  return (
    <aside className={styles.sideBar}>
      <div className={styles.buttonSection}>
        <IconButton
          icon={<DocsSVGIcon isActive={isDocsOpen} />}
          title={translate('Documentation Explorer')}
          onClick={handleDocsClick}
          isActive={isDocsOpen}
          testId="sidebar-docs-button"
        />
        <IconButton
          icon={<SettingsSVGIcon />}
          title={translate('Settings dialog')}
          onClick={handleSettingsClick}
          testId="sidebar-settings-button"
        />
      </div>
    </aside>
  );
}
