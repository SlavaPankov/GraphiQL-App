import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { AboutPage } from './pages/AboutPage';

const routes = createRoutesFromElements(
  <Route>
    <Route path="/" element={<MainPage />} />
    <Route path="/about" element={<AboutPage />} />
  </Route>
);

const router = createBrowserRouter(routes);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
