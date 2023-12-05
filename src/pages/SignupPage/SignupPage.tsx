import { Link } from 'react-router-dom';
import { ERoutes } from '../../types/enums/ERoutes';

export function SignupPage() {
  return (
    <>
      <h1>Signup</h1>
      <Link to={ERoutes.home}>Home</Link>
    </>
  );
}
