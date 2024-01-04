import { ErrorBoundary } from '@components/ErrorBoundary';
import { Fallback } from '@components/Fallback';
import { UseLocalizationContext } from '@context/LocalizationContext';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { MainLayout } from '@components/MainLayout';
import { ERoutes } from '@type/enums/ERoutes';
import { lazy } from 'react';
import store from './store/store';

const WelcomePage = lazy(() => import('@pages/WelcomePage/WelcomePage'));
const GraphiQLPage = lazy(() => import('@pages/GraphiQLPage/GraphiQLPage'));
const SignupPage = lazy(() => import('@pages/SignupPage/SignupPage'));
const LoginPage = lazy(() => import('@pages/LoginPage/LoginPage'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage/NotFoundPage'));

const routes = createRoutesFromElements(
  <Route path={ERoutes.home} element={<MainLayout />}>
    <Route index element={<GraphiQLPage />} />
    <Route path={ERoutes.welcome} element={<WelcomePage />} />
    <Route path={ERoutes.signup} element={<SignupPage />} />
    <Route path={ERoutes.login} element={<LoginPage />} />
    <Route path={ERoutes.all} element={<NotFoundPage />} />
  </Route>
);

const router = createBrowserRouter(routes);

export function App() {
  return (
    <ErrorBoundary fallback={<Fallback />}>
      <Provider store={store}>
        <UseLocalizationContext>
          <RouterProvider router={router} />
        </UseLocalizationContext>
      </Provider>
    </ErrorBoundary>
  );
}
