import { useContext } from 'react';
import { localizationContext } from '../../../context/LocalizationContext/LocalizationContext';
import { GQLAppButton } from '../GQLAppButton';
import styles from './sidebar.module.scss';
import {
  DocsSVGIcon,
  HistorySVGIcon,
  KeyboardShortcutSVGIcon,
  ReloadSVGIcon,
  SettingsSVGIcon,
} from '../GQLAppButton/icons';

export function Sidebar() {
  const { translate } = useContext(localizationContext);

  return (
    <aside className={styles.sideBar}>
      <div className={styles.buttonSection}>
        <GQLAppButton
          icon={<DocsSVGIcon />}
          title={translate('Documentation Explorer')}
        />
        <GQLAppButton icon={<HistorySVGIcon />} title={translate('History')} />
      </div>
      <div className={styles.buttonSection}>
        <GQLAppButton
          icon={<ReloadSVGIcon />}
          title={translate('Re-fetch GraphQL schema')}
        />
        <GQLAppButton
          icon={<KeyboardShortcutSVGIcon />}
          title={translate('Short keys')}
        />
        <GQLAppButton
          icon={<SettingsSVGIcon />}
          title={translate('Settings dialog')}
        />
      </div>
    </aside>
  );
}
