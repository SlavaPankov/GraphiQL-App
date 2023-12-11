import { afterEach, describe, expect, it, vi } from 'vitest';
import { IFormData } from '@type/interfaces/IFormData';
import { act } from '@testing-library/react';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { signupWithEmailAndPassword } from '@utils/signupWithEmailAndPassword';
import { addDoc } from 'firebase/firestore';
import { auth } from '../../firebase/firebase';
import { mockAuthData } from '../mocks/mockAuthData';
import { userMock } from '../mocks/userMock';

vi.mock('firebase/auth', async (importOriginal) => {
  const original = await importOriginal<typeof import('firebase/auth')>();
  return {
    ...original,
    createUserWithEmailAndPassword: vi.fn(),
    updateProfile: vi.fn(),
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

vi.mock('firebase/firestore', async (importOriginal) => {
  const original = await importOriginal<typeof import('firebase/firestore')>();
  return {
    ...original,
    collection: vi.fn(),
    addDoc: vi.fn(),
  };
});

const translateMock = vi.fn((key: string) => key);
const credentials: Pick<IFormData, 'email' | 'password' | 'name'> = {
  name: mockAuthData.name,
  email: mockAuthData.email,
  password: mockAuthData.password,
};

afterEach(() => {
  vi.clearAllMocks();
});

describe('Login with email and password', () => {
  it('should successfully signs up a new user', async () => {
    const mockCreatedUser: UserCredential = {
      user: userMock,
      providerId: null,
      operationType: 'link',
    };

    vi.mocked(createUserWithEmailAndPassword).mockResolvedValueOnce(
      mockCreatedUser
    );

    await act(async () => {
      await signupWithEmailAndPassword(
        { ...credentials, name: credentials.name ?? '' },
        translateMock
      );
    });

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      credentials.email,
      credentials.password
    );
    expect(updateProfile).toHaveBeenCalledWith(mockCreatedUser.user, {
      displayName: credentials.name,
    });
    expect(addDoc).toHaveBeenCalledWith(undefined, {
      uid: mockCreatedUser.user.uid,
      displayName: credentials.name,
      authProvider: 'local',
      email: credentials.email,
    });
    expect(toast.error).not.toHaveBeenCalled();
  });

  it('should handles auth/email-already-exists error', async () => {
    vi.mocked(createUserWithEmailAndPassword).mockRejectedValueOnce({
      code: 'auth/email-already-exists',
    });

    await act(async () => {
      await signupWithEmailAndPassword(
        { ...credentials, name: credentials.name ?? '' },
        translateMock
      );
    });

    expect(translateMock).toHaveBeenCalledWith('Email exists');
    expect(toast.error).toHaveBeenCalledWith('Email exists');
  });

  it('should handles default error', async () => {
    vi.mocked(createUserWithEmailAndPassword).mockRejectedValueOnce({
      code: 'code',
    });

    await act(async () => {
      await signupWithEmailAndPassword(
        { ...credentials, name: credentials.name ?? '' },
        translateMock
      );
    });

    expect(translateMock).not.toBeCalled();
    expect(toast.error).toHaveBeenCalledWith('code');
  });
});
