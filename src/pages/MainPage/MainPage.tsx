import { useAuthState } from 'react-firebase-hooks/auth';
import { H1 } from '@components/Headings';
import { auth } from '../../firebase/firebase';

export function MainPage() {
  const [user] = useAuthState(auth);

  return (
    <div className="container">
      <H1 title={`Hello ${user?.displayName}`} />
    </div>
  );
}
