import { Link } from 'react-router-dom';
import { Heading } from '@components/Heading';
import { ERoutes } from '../../types/enums/ERoutes';

export function MainPage() {
  return (
    <div className="container">
      <Heading />
      <Link to={ERoutes.signup}>About</Link>
    </div>
  );
}
