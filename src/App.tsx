import { ErrorBoundary } from '@components/ErrorBoundary';
import { Fallback } from '@components/Fallback';
import { UseLocalizationContext } from '@context/LocalizationContext';
import { LoginPage } from '@pages/LoginPage';
import { MainPage } from '@pages/MainPage';
import { NotFoundPage } from '@pages/NotFoundPage';
import { SignupPage } from '@pages/SignupPage';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { GraphiQLPage } from '@pages/GraphiQLPage';
import store from './store/store';
import { ERoutes } from './types/enums/ERoutes';

const routes = createRoutesFromElements(
  <Route>
    <Route path={ERoutes.home} element={<MainPage />} />
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
