import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { LoginPage } from '@pages/LoginPage';
import { Provider } from 'react-redux';
import store from '@store/store.ts';
import { UseLocalizationContext } from '@context/LocalizationContext';
import { render, waitFor, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ReactNode } from 'react';
import { ERoutes } from '@type/enums/ERoutes';
import { MainPage } from '@pages/MainPage';
import { AuthGate } from '@components/AuthGate';
import { LoginFormContainer } from '@components/LoginFormContainer';

function prepare() {
  const router = createMemoryRouter(
    [
      {
        path: ERoutes.home,
        element: <MainPage />,
      },
      {
        path: ERoutes.login,
        element: <LoginPage />,
      },
    ],
    { initialEntries: ['/', '/login'], initialIndex: 1 }
  );

  return render(
    <Provider store={store}>
      <UseLocalizationContext>
        <RouterProvider router={router} />
      </UseLocalizationContext>
    </Provider>
  );
}

vi.mock('@components/AuthGate', () => ({
  AuthGate: vi.fn(({ children }: { children: ReactNode }) => (
    <div data-testid="authGate">{children}</div>
  )),
}));

vi.mock('@components/LoginFormContainer', () => ({
  LoginFormContainer: vi.fn(() => <div data-testid="loginFormContainer" />),
}));

describe('Login page', () => {
  it('should render login page with AuthGate and Login form container', async () => {
    const { getByTestId } = prepare();

    await waitFor(() => getByTestId('loginFormContainer'));

    screen.debug();

    expect(AuthGate).toHaveBeenCalledWith(
      expect.objectContaining({
        redirectTo: ERoutes.home,
        logoutRequired: true,
      }),
      {}
    );

    expect(LoginFormContainer).toHaveBeenCalled();
  });
});
