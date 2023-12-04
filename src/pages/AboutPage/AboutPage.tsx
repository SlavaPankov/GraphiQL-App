import { Link } from 'react-router-dom';
import { ERoutes } from '../../types/enums/ERoutes';

export function AboutPage() {
  return (
    <>
      <h1>About page</h1>
      <Link to={ERoutes.home}>Home</Link>
    </>
  );
}
