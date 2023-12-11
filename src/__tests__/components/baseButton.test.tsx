import { describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { BaseButton } from '@components/BaseButton';

describe('Base button', () => {
  it('should render button with correct label', () => {
    render(<BaseButton label="Test" />);

    expect(screen.getByRole('button', { name: 'Test' })).toHaveTextContent(
      'Test'
    );
    fireEvent.click(screen.getByRole('button', { name: 'Test' }));
  });

  it('should be called onClick method', () => {
    const mockOnClick = vi.fn();
    render(<BaseButton label="Test" onClick={mockOnClick} />);

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Test' }));
    });

    expect(mockOnClick).toBeCalledTimes(1);
  });
});
