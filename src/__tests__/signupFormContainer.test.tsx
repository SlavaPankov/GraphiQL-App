import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@store/store.ts';
import { UseLocalizationContext } from '@context/LocalizationContext';
import { SignupFormContainer } from '@components/SignupFormContainer';
import { signupWithEmailAndPassword } from '@utils/signupWithEmailAndPassword.ts';

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
      target: { value: 'john@example.com' },
    });
    fireEvent.change(getByLabelText('Имя'), {
      target: { value: 'John' },
    });
    fireEvent.change(getByLabelText('Пароль'), {
      target: { value: 'Password123$' },
    });
    fireEvent.change(getByLabelText('Подтвердите пароль'), {
      target: { value: 'Password123$' },
    });

    fireEvent.click(getByRole('button', { name: 'Зарегистрироваться' }));

    await waitFor(() => {
      expect(signupWithEmailAndPassword).toHaveBeenCalledWith(
        {
          email: 'john@example.com',
          password: 'Password123$',
          name: 'John',
        },
        expect.any(Function)
      );
    });
  });
});
