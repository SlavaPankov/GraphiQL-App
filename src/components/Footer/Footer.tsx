import { useContext } from 'react';
import { localizationContext } from '@context/LocalizationContext';
import classNames from 'classnames';
import { RsLogoSvgIcon } from '@components/Footer/icons';
import { EStudentGit } from '@type/enums/EStudentGit';
import styles from './footer.module.scss';

export function Footer() {
  const { translate } = useContext(localizationContext);
  return (
    <footer className={styles.root} data-testid="footer">
      <div className={classNames(styles.footerContainer, 'container')}>
        <a
          className={styles.logo}
          href="https://rs.school"
          target="_blank"
          rel="noreferrer"
        >
          <RsLogoSvgIcon />
        </a>
        <ul className={styles.students}>
          <li>
            <a className={styles.link} href={EStudentGit.first}>
              {translate('FirstStudent')}
            </a>
          </li>
          <li>
            <a className={styles.link} href={EStudentGit.second}>
              {translate('SecondStudent')}
            </a>
          </li>
          <li>
            <a className={styles.link} href={EStudentGit.third}>
              {translate('ThirdStudent')}
            </a>
          </li>
        </ul>

        <div className={styles.date}>&#169; 2023</div>
      </div>
    </footer>
  );
}
