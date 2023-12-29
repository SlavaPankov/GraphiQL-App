import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@store/store';
import { UseLocalizationContext } from '@context/LocalizationContext';
import { render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ReactNode } from 'react';
import { ERoutes } from '@type/enums/ERoutes';
import { MainPage } from '@pages/MainPage';
import { AuthGate } from '@components/AuthGate';
import { SignupFormContainer } from '@components/SignupFormContainer';
import { SignupPage } from '@pages/SignupPage';

function prepare() {
  const router = createMemoryRouter(
    [
      {
        path: ERoutes.home,
        element: <MainPage />,
      },
      {
        path: ERoutes.signup,
        element: <SignupPage />,
      },
    ],
    { initialEntries: ['/', '/signup'], initialIndex: 1 }
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

vi.mock('@components/SignupFormContainer', () => ({
  SignupFormContainer: vi.fn(() => <div data-testid="signupFormContainer" />),
}));

describe('Login page', () => {
  it('should render login page with AuthGate and Signup form container', async () => {
    const { getByTestId } = prepare();

    await waitFor(() => getByTestId('signupFormContainer'));

    expect(AuthGate).toHaveBeenCalledWith(
      expect.objectContaining({
        redirectTo: ERoutes.home,
        logoutRequired: true,
      }),
      {}
    );

    expect(SignupFormContainer).toHaveBeenCalled();
  });
});
