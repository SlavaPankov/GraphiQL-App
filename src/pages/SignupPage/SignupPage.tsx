import { SignupFormContainer } from '@components/SignupFormContainer';
import { AuthGate } from '@components/AuthGate';
import { ERoutes } from '@type/enums/ERoutes';

function SignupPage() {
  return (
    <AuthGate redirectTo={ERoutes.home} logoutRequired>
      <SignupFormContainer />
    </AuthGate>
  );
}

export default SignupPage;
