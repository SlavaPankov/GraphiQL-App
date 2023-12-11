import { AuthGate } from '@components/AuthGate';
import { LoginFormContainer } from '@components/LoginFormContainer';
import { ERoutes } from '@type/enums/ERoutes';

export function LoginPage() {
  return (
    <AuthGate redirectTo={ERoutes.home} logoutRequired>
      <LoginFormContainer />
    </AuthGate>
  );
}
