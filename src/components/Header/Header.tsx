import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { localizationContext } from '@context/LocalizationContext';
import { BaseButton } from '@components/BaseButton';
import classNames from 'classnames';
import { useAuthState } from 'react-firebase-hooks/auth';
import signOutUser from '@utils/singoutUser';
import { ERoutes } from '@type/enums/ERoutes';
import Logo from '@assets/images/logo.png';
import styles from './header.module.scss';
import { auth } from '../../firebase/firebase';

export function Header() {
  const { locale, setLocale, translate } = useContext(localizationContext);
  const [scrolling, setScrolling] = useState(false);
  const [user] = useAuthState(auth);
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleClick = () => {
    setLocale(locale === 'ru' ? 'en' : 'ru');
  };

  const handleSignOutClick = async () => {
    await signOutUser();
  };

  return (
    <header
      className={classNames(styles.root, scrolling && styles.scrolling)}
      data-testid="header"
    >
      <div className={classNames('container', styles.content)}>
        <nav>
          <Link
            className={classNames(styles.toMain, scrolling && styles.scrolling)}
            to={ERoutes.welcome}
          >
            <img
              src={Logo}
              className={styles.logo}
              alt="logo"
              width={50}
              height={50}
            />
            <span>GraphQL App</span>
          </Link>
        </nav>
        <div
          className={classNames(
            styles.controllers,
            scrolling && styles.scrolling
          )}
        >
          <BaseButton label={translate('Language')} onClick={handleClick} />
          {user && (
            <button
              className={classNames(
                styles.signout,
                scrolling && styles.scrolling
              )}
              type="button"
              onClick={handleSignOutClick}
            >
              {translate('Sign out')}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
