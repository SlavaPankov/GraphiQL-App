import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { MainPage } from './pages/MainPage';
import { AboutPage } from './pages/AboutPage';
import { ERoutes } from './types/enums/ERoutes';
import { UseLocalizationContext } from './context/LocalizationContext';
import store from './store/store';
import { GraphiQLPage } from './pages/GraphiQLPage';

const routes = createRoutesFromElements(
  <Route>
    <Route path={ERoutes.home} element={<MainPage />} />
    <Route path={ERoutes.about} element={<AboutPage />} />
    <Route path={ERoutes.graphql} element={<GraphiQLPage />} />
  </Route>
);

const router = createBrowserRouter(routes);

export function App() {
  return (
    <Provider store={store}>
      <UseLocalizationContext>
        <RouterProvider router={router} />
      </UseLocalizationContext>
    </Provider>
  );
}
