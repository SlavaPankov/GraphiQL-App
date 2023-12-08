import { ReactNode, useEffect } from 'react';
import { ERoutes } from '@type/enums/ERoutes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase';

interface IAuthGate {
  children: ReactNode;
  redirectTo: ERoutes;
  logoutRequired?: boolean;
  loginRequired?: boolean;
  loader?: ReactNode;
}

export function AuthGate({
  children,
  redirectTo,
  logoutRequired,
  loginRequired,
  loader,
}: IAuthGate) {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }

    if ((loginRequired && !user) ?? (logoutRequired && user)) {
      navigate(redirectTo);
    }
  }, [user, loading, logoutRequired, loginRequired, redirectTo]);

  if (loading) {
    return loader;
  }

  if ((!user && loginRequired) ?? (user && logoutRequired)) {
    return null;
  }

  return children;
}
