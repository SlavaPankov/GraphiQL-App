import { afterEach, describe, expect, it, vi } from 'vitest';
import { IFormData } from '@type/interfaces/IFormData';
import { loginWithEmailAndPassword } from '@utils/loginWithEmailAndPassword';
import { act } from '@testing-library/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../../firebase/firebase';
import { mockAuthData } from '../mocks/mockAuthData';
import { translateMock } from '../mocks/translateMock';

vi.mock('firebase/auth', async (importOriginal) => {
  const original = await importOriginal<typeof import('firebase/auth')>();
  return {
    ...original,
    signInWithEmailAndPassword: vi.fn(),
  };
});

vi.mock('react-toastify', async (importOriginal) => {
  const original = await importOriginal<typeof import('react-toastify')>();
  return {
    ...original,
    toast: {
      error: vi.fn(),
    },
  };
});

const credentials: Pick<IFormData, 'email' | 'password'> = {
  email: mockAuthData.email,
  password: mockAuthData.password,
};

afterEach(() => {
  vi.clearAllMocks();
});

describe('Login with email and password', () => {
  it('should handles successful login', async () => {
    await act(async () => {
      await loginWithEmailAndPassword(credentials, translateMock);
    });

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      credentials.email,
      credentials.password
    );
  });

  it('should handles auth/invalid-password error', async () => {
    vi.mocked(signInWithEmailAndPassword).mockRejectedValueOnce({
      code: 'auth/invalid-password',
    });

    await act(async () => {
      await loginWithEmailAndPassword(credentials, translateMock);
    });

    expect(translateMock).toHaveBeenCalledWith('Wrong password');
    expect(toast.error).toHaveBeenCalledWith('Wrong password');
  });

  it('should handles auth/user-not-found error', async () => {
    vi.mocked(signInWithEmailAndPassword).mockRejectedValueOnce({
      code: 'auth/user-not-found',
    });

    await act(async () => {
      await loginWithEmailAndPassword(credentials, translateMock);
    });

    expect(translateMock).toHaveBeenCalledWith("User don't exist");
    expect(toast.error).toHaveBeenCalledWith("User don't exist");
  });

  it('should handles auth/invalid-credential error', async () => {
    vi.mocked(signInWithEmailAndPassword).mockRejectedValueOnce({
      code: 'auth/invalid-credential',
    });

    await act(async () => {
      await loginWithEmailAndPassword(credentials, translateMock);
    });

    expect(translateMock).toHaveBeenCalledWith('Invalid credential');
    expect(toast.error).toHaveBeenCalledWith('Invalid credential');
  });

  it('should handles default error', async () => {
    vi.mocked(signInWithEmailAndPassword).mockRejectedValueOnce({
      code: 'code',
    });

    await act(async () => {
      await loginWithEmailAndPassword(credentials, translateMock);
    });

    expect(translateMock).not.toBeCalled();
    expect(toast.error).toHaveBeenCalledWith('code');
  });
});
