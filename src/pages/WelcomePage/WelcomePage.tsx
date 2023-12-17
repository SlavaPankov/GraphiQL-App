import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useContext } from 'react';
import { localizationContext } from '@context/LocalizationContext';
import { ERoutes } from '@type/enums/ERoutes';
import styles from './welcomePage.module.scss';
import { auth } from '../../firebase/firebase';

export function WelcomePage() {
  const [user] = useAuthState(auth);
  const { translate } = useContext(localizationContext);
  return (
    <div
      className={classNames('container', styles.root)}
      data-testid="welcomePage"
    >
      <div className={styles.content}>
        {user && (
          <Link className={styles.link} to="/">
            {translate('To main')}
          </Link>
        )}
        {!user && (
          <>
            <Link className={styles.link} to={ERoutes.signup}>
              {translate('Signup')}
            </Link>
            <Link className={styles.link} to={ERoutes.login}>
              {translate('Login')}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
