import { AuthGate } from '@components/AuthGate';
import { GraphqlApp } from '@components/GraphqlApp';
import { ERoutes } from '@type/enums/ERoutes';

function GraphiQLPage() {
  return (
    <AuthGate redirectTo={ERoutes.welcome} loginRequired>
      <GraphqlApp />
    </AuthGate>
  );
}

export default GraphiQLPage;
