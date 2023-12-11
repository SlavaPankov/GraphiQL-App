import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Form } from '@components/Form';
import { UseLocalizationContext } from '@context/LocalizationContext';
import { Provider } from 'react-redux';
import store from '@store/store';
import { mockAuthData } from './mocks/mockAuthData';

function prepare(isSignup: boolean, onSubmit = vi.fn()) {
  return render(
    <Provider store={store}>
      <UseLocalizationContext>
        <Form isSignup={isSignup} onSubmit={onSubmit} />
      </UseLocalizationContext>
    </Provider>
  );
}

describe('Form', () => {
  it('should form elements correctly for signup', async () => {
    const { getByLabelText, getByRole } = prepare(true);

    await waitFor(() => screen.getAllByRole('textbox'));

    expect(getByLabelText('Имя')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Пароль')).toBeInTheDocument();
    expect(getByLabelText('Подтвердите пароль')).toBeInTheDocument();
    expect(
      getByRole('button', { name: 'Зарегистрироваться' })
    ).toBeInTheDocument();
  });

  it('should form elements correctly for signin', async () => {
    const { getByLabelText, getByRole } = prepare(false);

    await waitFor(() => screen.getAllByRole('textbox'));

    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Пароль')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Войти' })).toBeInTheDocument();
  });

  it('should submits the form with valid data', async () => {
    const onSubmitMock = vi.fn();
    const { getByLabelText, getByRole } = prepare(true, onSubmitMock);

    fireEvent.change(getByLabelText('Имя'), {
      target: { value: mockAuthData.name },
    });
    fireEvent.change(getByLabelText('Email'), {
      target: { value: mockAuthData.email },
    });
    fireEvent.change(getByLabelText('Пароль'), {
      target: { value: mockAuthData.password },
    });
    fireEvent.change(getByLabelText('Подтвердите пароль'), {
      target: { value: mockAuthData.confirmPassword },
    });

    fireEvent.click(getByRole('button', { name: 'Зарегистрироваться' }));

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith(mockAuthData);
    });
  });

  it('should disables the button with validation errors', async () => {
    const onSubmitMock = vi.fn();
    const { getByRole } = prepare(true, onSubmitMock);

    fireEvent.click(getByRole('button', { name: 'Зарегистрироваться' }));

    await waitFor(() => {
      expect(
        getByRole('button', { name: 'Зарегистрироваться' })
      ).toBeDisabled();
    });
  });
});
