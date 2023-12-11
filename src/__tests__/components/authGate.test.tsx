import { describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { AuthGate } from '@components/AuthGate';
import { ERoutes } from '@type/enums/ERoutes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { NotFoundPage } from '@pages/NotFoundPage';
import { userMock } from '../mocks/userMock';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const original = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('react-firebase-hooks/auth');

function prepare(loginRequired: boolean, logoutRequired: boolean) {
  const router = createMemoryRouter(
    [
      {
        path: ERoutes.home,
        element: (
          <AuthGate
            redirectTo={ERoutes.login}
            loginRequired={loginRequired}
            logoutRequired={logoutRequired}
            loader={<div data-testid="loader">Loading...</div>}
          >
            <div data-testid="child">Child component</div>
          </AuthGate>
        ),
      },
      {
        path: ERoutes.login,
        element: <NotFoundPage />,
      },
    ],
    { initialEntries: ['/'] }
  );

  return render(<RouterProvider router={router} />);
}

describe('Auth Gate', () => {
  it('renders children when user is authenticated and login is required', () => {
    vi.mocked(useAuthState).mockReturnValueOnce([userMock, false, undefined]);
    prepare(true, false);

    const childElement = screen.getByTestId('child');
    expect(childElement).toBeInTheDocument();

    vi.resetModules();
  });

  it('should render loader when is loading', () => {
    vi.mocked(useAuthState).mockReturnValueOnce([userMock, true, undefined]);
    prepare(true, false);

    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toBeInTheDocument();

    vi.resetModules();
  });

  it('should redirect to login page if not auth', async () => {
    vi.mocked(useAuthState).mockReturnValueOnce([null, false, undefined]);
    prepare(true, false);
    await act(async () => {});

    expect(mockNavigate).toBeCalledWith(ERoutes.login);
  });

  it('should redirects when user is authenticated and logout is required', async () => {
    vi.mocked(useAuthState).mockReturnValueOnce([userMock, false, undefined]);
    prepare(false, true);
    await act(async () => {});

    expect(mockNavigate).toBeCalledWith(ERoutes.login);
  });
});
