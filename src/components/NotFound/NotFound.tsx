import { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { localizationContext } from '@context/LocalizationContext';
import { ERoutes } from '@type/enums/ERoutes';
import Logo from '@assets/images/logo.png';
import styles from './notFound.module.scss';

export function NotFound() {
  const { translate } = useContext(localizationContext);
  const className = classNames('container', {
    [styles.container]: true,
  });

  return (
    <div className={className}>
      <img src={Logo} alt="GraphiQL" width={240} height={240} />
      <h1 className={styles.heading}>{translate('Not found')}</h1>
      <Link className={styles.link} to={ERoutes.home}>
        {translate('To main')}
      </Link>
    </div>
  );
}
