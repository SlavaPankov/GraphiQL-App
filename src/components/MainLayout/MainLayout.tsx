import { Footer } from '@components/Footer';
import { Outlet } from 'react-router-dom';
import { Header } from '@components/Header';
import { ToastContainer } from 'react-toastify';
import { Suspense } from 'react';
import { Loader } from '@components/Loader';
import styles from './mainLayout.module.scss';

export function MainLayout() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <ToastContainer autoClose={3000} position="bottom-center" />
      <Footer />
    </>
  );
}
