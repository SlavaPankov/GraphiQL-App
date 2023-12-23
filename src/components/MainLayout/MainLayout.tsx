import { Footer } from '@components/Footer';
import { Outlet } from 'react-router-dom';
import styles from './mainLayout.module.scss';

export function MainLayout() {
  return (
    <>
      <div className="FAKE HEADER">FAKE HEADER CHANGE TO REAL ONE!</div>
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
