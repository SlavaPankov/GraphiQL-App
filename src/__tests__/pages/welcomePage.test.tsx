import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { useAuthState } from 'react-firebase-hooks/auth';
import { WelcomePage } from '@pages/WelcomePage';
import { userMock } from '../mocks/userMock';

vi.mock('react-firebase-hooks/auth');
describe('WelcomePageBody Component', () => {
  it('renders WelcomePage', () => {
    vi.mocked(useAuthState).mockReturnValueOnce([userMock, false, undefined]);

    render(
      <BrowserRouter>
        <WelcomePage />
      </BrowserRouter>
    );
    expect(screen.getByTestId('welcomePageBody')).toBeTruthy();
  });
});
