import store from '@store/store';
import { ERoutes } from '@type/enums/ERoutes';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

type TMemoryRouterProps = {
  element: ReactNode;
  path?: string;
} & Parameters<typeof createMemoryRouter>[1];

export function MemoryRouter({
  element,
  path = ERoutes.home,
  initialEntries,
  initialIndex,
}: TMemoryRouterProps) {
  const routes = [{ path, element }];
  return (
    <RouterProvider
      router={createMemoryRouter(routes, { initialEntries, initialIndex })}
    />
  );
}

export function MemoryRouterWithStore(args: TMemoryRouterProps) {
  return (
    <Provider store={store}>
      <MemoryRouter {...args} />
    </Provider>
  );
}
