import { Link } from 'react-router-dom';
import { ERoutes } from '@type/enums/ERoutes';

export function MainPage() {
  return (
    <div className="container">
      <Link to={ERoutes.signup}>About</Link>
    </div>
  );
}
