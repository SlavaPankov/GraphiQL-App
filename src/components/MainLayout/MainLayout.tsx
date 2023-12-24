import { Footer } from '@components/Footer';
import { Outlet } from 'react-router-dom';
import { Header } from '@components/Header';
import styles from './mainLayout.module.scss';

export function MainLayout() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
