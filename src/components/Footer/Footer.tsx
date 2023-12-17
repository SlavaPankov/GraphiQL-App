import { EStudentsGits } from '@type/enums/ERoutes';
import { useContext } from 'react';
import { localizationContext } from '@context/LocalizationContext';
import classNames from 'classnames';
import { RsLogoSvgIcon } from '@components/Footer/icons';
import styles from './footer.module.scss';

export function Footer() {
  const { translate } = useContext(localizationContext);
  return (
    <footer className={styles.root} data-testid="footer">
      <div className={classNames(styles.footerContainer, 'container')}>
        <div className={styles.details}>
          <ul className={styles.students}>
            <li>
              <a className={styles.link} href={EStudentsGits.first}>
                {translate('FirstStudent')}
              </a>
            </li>
            <li>
              <a className={styles.link} href={EStudentsGits.second}>
                {translate('SecondStudent')}
              </a>
            </li>
            <li>
              <a className={styles.link} href={EStudentsGits.third}>
                {translate('ThirdStudent')}
              </a>
            </li>
          </ul>
          <div className={styles.date}>2023</div>
        </div>
        <a
          className={styles.logo}
          href="https://rs.school"
          target="_blank"
          rel="noreferrer"
        >
          <RsLogoSvgIcon />
        </a>
      </div>
    </footer>
  );
}
