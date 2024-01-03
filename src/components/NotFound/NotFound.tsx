import { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { localizationContext } from '@context/LocalizationContext';
import { ERoutes } from '@type/enums/ERoutes';
import Logo from '@assets/images/logo.png';
import { H1 } from '@components/Headings';
import styles from './notFound.module.scss';

export function NotFound() {
  const { translate } = useContext(localizationContext);

  return (
    <div className={classNames(styles.root, 'container')}>
      <img src={Logo} alt="GraphiQL" width={240} height={240} />
      <H1 title={translate('Not found')} />
      <Link className={styles.link} to={ERoutes.home}>
        {translate('To main')}
      </Link>
    </div>
  );
}
