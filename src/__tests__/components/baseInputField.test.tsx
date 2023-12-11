import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { BaseInputField } from '@components/BaseInputField';

describe('Base input field', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render with default props', () => {
    const { getByRole, getByLabelText } = render(
      <BaseInputField
        onChange={() => {}}
        name="name"
        id="id"
        type="text"
        value=""
      />
    );

    expect(getByLabelText('')).toBeInTheDocument();
    expect(getByRole('textbox')).toHaveAttribute('value', '');
  });

  it('should renders with label and placeholder', () => {
    const { getByLabelText, getByPlaceholderText } = render(
      <BaseInputField
        id="test"
        type="text"
        name="test"
        value=""
        onChange={() => {}}
        label="Test Label"
        placeholder="Enter value"
      />
    );

    expect(getByLabelText('Test Label')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter value')).toBeInTheDocument();
  });

  it('renders with an error message', () => {
    const { getByText } = render(
      <BaseInputField
        id="test"
        type="text"
        name="test"
        value=""
        onChange={() => {}}
        error="This field is required"
      />
    );

    expect(getByText('This field is required')).toBeInTheDocument();
  });

  it('disables autoComplete for password input', () => {
    const { getByLabelText } = render(
      <BaseInputField
        id="password"
        type="password"
        name="password"
        value=""
        onChange={() => {}}
      />
    );

    const passwordInput = getByLabelText('');

    expect(passwordInput).toHaveAttribute('autocomplete', 'new-password');
  });

  it('does not disable autoComplete for non-password input', () => {
    const { getByRole } = render(
      <BaseInputField
        id="text"
        type="text"
        name="text"
        value=""
        onChange={() => {}}
      />
    );

    expect(getByRole('textbox')).toHaveAttribute('autoComplete', 'off');
  });

  it('calls onChange handler when input value changes', () => {
    const onChangeMock = vi.fn();
    const { getByRole } = render(
      <BaseInputField
        id="test"
        type="text"
        name="test"
        value=""
        onChange={onChangeMock}
      />
    );

    act(() => {
      fireEvent.change(getByRole('textbox'), {
        target: { value: 'new value' },
      });
    });

    expect(onChangeMock).toHaveBeenCalled();
  });
});
