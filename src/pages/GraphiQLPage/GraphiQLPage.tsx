import { AuthGate } from '@components/AuthGate';
import { GraphqlApp } from '@components/GraphqlApp';
import { ERoutes } from '@type/enums/ERoutes';

export function GraphiQLPage() {
  return (
    <>
      <header />

      <AuthGate redirectTo={ERoutes.login} loginRequired>
        <GraphqlApp />
      </AuthGate>

      <footer />
    </>
  );
}
