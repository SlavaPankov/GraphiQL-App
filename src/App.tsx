import { ErrorBoundary } from '@components/ErrorBoundary';
import { Fallback } from '@components/Fallback';
import { UseLocalizationContext } from '@context/LocalizationContext';
import { MainPage } from '@pages/MainPage';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { MainLayout } from '@components/MainLayout';
import { ERoutes } from '@type/enums/ERoutes';
import { WelcomePage } from '@pages/WelcomePage';
import { GraphiQLPage } from '@pages/GraphiQLPage';
import { SignupPage } from '@pages/SignupPage';
import { LoginPage } from '@pages/LoginPage';
import { NotFoundPage } from '@pages/NotFoundPage';
import store from './store/store';

const routes = createRoutesFromElements(
  <Route path={ERoutes.home} element={<MainLayout />}>
    <Route index element={<MainPage />} />
    <Route path={ERoutes.welcome} element={<WelcomePage />} />
    <Route path={ERoutes.graphql} element={<GraphiQLPage />} />
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
