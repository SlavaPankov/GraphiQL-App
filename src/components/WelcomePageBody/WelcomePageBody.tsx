import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ERoutes } from '@type/enums/ERoutes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useContext } from 'react';
import { localizationContext } from '@context/LocalizationContext';
import Logo from '@assets/images/logo.png';
import styles from './welcomePageBody.module.scss';
import { auth } from '../../firebase/firebase';

export function WelcomePageBody() {
  const [user] = useAuthState(auth);
  const { translate } = useContext(localizationContext);
  return (
    <div
      className={classNames('container', styles.root)}
      data-testid="welcomePageBody"
    >
      <div className={styles.greeting}>
        <h1 className={styles.title}>{translate('Welcome title')}</h1>
        <p>{translate('Welcome description')}</p>
        <div className={styles.apiTextContainer}>
          <a
            className={styles.apiLink}
            href="https://rickandmortyapi.com"
            target="_blank"
            rel="noreferrer"
          >
            {translate('Rick & Morty API')}
          </a>
          <p>{translate('Welcome link text')}</p>
        </div>
        <p>{translate('Welcome gratitude')}</p>
      </div>

      <div className={styles.activeZone}>
        <img src={Logo} className={styles.logo} alt="logo" />
        {user && (
          <Link className={classNames(styles.link, styles.linkReg)} to="/">
            {translate('To main')}
          </Link>
        )}
        {!user && (
          <>
            <Link className={styles.link} to={ERoutes.login}>
              {translate('Login')}
            </Link>
            <Link
              className={classNames(styles.link, styles.linkReg)}
              to={ERoutes.signup}
            >
              {translate('Signup')}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
