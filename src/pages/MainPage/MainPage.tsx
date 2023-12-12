import { Link } from 'react-router-dom';
import { ERoutes } from '@type/enums/ERoutes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { H1 } from '@components/Headings';
import { Header } from '@components/Header';
import { auth } from '../../firebase/firebase';

export function MainPage() {
  const [user] = useAuthState(auth);

  return (
    <>
      <Header />
      <div className="container">
        <H1 title={`Hello ${user?.displayName}`} />

        <div>
          <Link to={ERoutes.signup}>Signup</Link>
        </div>
        <div>
          <Link to={ERoutes.login}>Login</Link>
        </div>
      </div>
    </>
  );
}
