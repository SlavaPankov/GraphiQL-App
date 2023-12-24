import { Header } from '@components/Header';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { userMock } from '../mocks/userMock';

vi.mock('react-firebase-hooks/auth');

describe('Header Component', () => {
  beforeEach(() => {
    vi.mocked(useAuthState).mockReturnValueOnce([userMock, false, undefined]);

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  });

  it('renders without crashing', () => {
    expect(screen.getByTestId('header')).toBeTruthy();
  });

  it('renders button', () => {
    expect(screen.getAllByRole('button')).toBeTruthy();
  });

  it('checks if link has href attribute equal to "/"', () => {
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });
});
