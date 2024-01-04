import { fireEvent, render, waitFor } from '@testing-library/react';
import { UseLocalizationContext } from '@context/LocalizationContext';
import { Provider } from 'react-redux';
import store from '@store/store';
import { LoginFormContainer } from '@components/LoginFormContainer';
import { describe, expect, it, vi } from 'vitest';
import { loginWithEmailAndPassword } from '@utils/loginWithEmailAndPassword';
import { BrowserRouter } from 'react-router-dom';
import { mockAuthData } from '../mocks/mockAuthData';

function prepare() {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <UseLocalizationContext>
          <LoginFormContainer />
        </UseLocalizationContext>
      </BrowserRouter>
    </Provider>
  );
}

vi.mock('@utils/loginWithEmailAndPassword.ts', () => ({
  loginWithEmailAndPassword: vi.fn(),
}));

describe('Login form container', () => {
  it('should submits the login form with valid data', async () => {
    const { getByLabelText, getByRole, getAllByRole } = prepare();

    await waitFor(() => getAllByRole('textbox'));

    fireEvent.change(getByLabelText(/Email/i), {
      target: { value: mockAuthData.email },
    });
    fireEvent.change(getByLabelText(/Пароль/i), {
      target: { value: mockAuthData.password },
    });

    fireEvent.click(getByRole('button', { name: 'Войти' }));

    await waitFor(() => {
      expect(loginWithEmailAndPassword).toHaveBeenCalledWith(
        { email: mockAuthData.email, password: mockAuthData.password },
        expect.any(Function)
      );
    });
  });
});
