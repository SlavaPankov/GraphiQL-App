import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { Fallback } from '@components/Fallback';
import { ErrorBoundary } from '@components/ErrorBoundary';
import { UseLocalizationContext } from '@context/LocalizationContext';
import { MainPage } from './pages/MainPage';
import { ERoutes } from './types/enums/ERoutes';
import { SignupPage } from './pages/SignupPage';
import { NotFoundPage } from './pages/NotFoundPage';
import store from './store/store';

const routes = createRoutesFromElements(
  <Route>
    <Route path={ERoutes.home} element={<MainPage />} />
    <Route path={ERoutes.signup} element={<SignupPage />} />
    <Route path={ERoutes.login} element={<SignupPage />} />
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
