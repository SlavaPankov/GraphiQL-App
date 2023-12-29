import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@store/store';
import { UseLocalizationContext } from '@context/LocalizationContext';
import { SignupFormContainer } from '@components/SignupFormContainer';
import { signupWithEmailAndPassword } from '@utils/signupWithEmailAndPassword';
import { mockAuthData } from '../mocks/mockAuthData';

function prepare() {
  return render(
    <Provider store={store}>
      <UseLocalizationContext>
        <SignupFormContainer />
      </UseLocalizationContext>
    </Provider>
  );
}

vi.mock('@utils/signupWithEmailAndPassword.ts', () => ({
  signupWithEmailAndPassword: vi.fn(),
}));

describe('Login form container', () => {
  it('should submits the login form with valid data', async () => {
    const { getByLabelText, getByRole, getAllByRole } = prepare();

    await waitFor(() => getAllByRole('textbox'));

    fireEvent.change(getByLabelText('Email'), {
      target: { value: mockAuthData.email },
    });
    fireEvent.change(getByLabelText('Имя'), {
      target: { value: mockAuthData.name },
    });
    fireEvent.change(getByLabelText('Пароль'), {
      target: { value: mockAuthData.password },
    });
    fireEvent.change(getByLabelText('Подтвердите пароль'), {
      target: { value: mockAuthData.confirmPassword },
    });

    fireEvent.click(getByRole('button', { name: 'Зарегистрироваться' }));

    await waitFor(() => {
      expect(signupWithEmailAndPassword).toHaveBeenCalledWith(
        {
          email: mockAuthData.email,
          password: mockAuthData.password,
          name: mockAuthData.name,
        },
        expect.any(Function)
      );
    });
  });
});
