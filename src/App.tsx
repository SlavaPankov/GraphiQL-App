import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { AboutPage } from './pages/AboutPage';
import { ERoutes } from './types/enums/ERoutes';

const routes = createRoutesFromElements(
  <Route>
    <Route path={ERoutes.home} element={<MainPage />} />
    <Route path={ERoutes.about} element={<AboutPage />} />
  </Route>
);

const router = createBrowserRouter(routes);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
