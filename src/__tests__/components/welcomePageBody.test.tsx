import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAuthState } from 'react-firebase-hooks/auth';
import { WelcomePageBody } from '@components/WelcomePageBody';
import { userMock } from '../mocks/userMock';

vi.mock('react-firebase-hooks/auth');
describe('WelcomePageBody Component', () => {
  beforeEach(() => {
    vi.mocked(useAuthState).mockReturnValueOnce([userMock, false, undefined]);

    render(
      <BrowserRouter>
        <WelcomePageBody />
      </BrowserRouter>
    );
  });
  it('renders WelcomePageBody', () => {
    expect(screen.getByTestId('welcomePageBody')).toBeTruthy();
  });
});
