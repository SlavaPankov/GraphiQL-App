/* eslint-disable @typescript-eslint/unbound-method */
import { it, describe, expect, vi, beforeAll } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Fallback } from '@components/Fallback';

beforeAll(() => {
  Object.defineProperty(window, 'location', {
    value: {
      ...window.location,
      reload: vi.fn(),
    },
    writable: true,
  });
});

describe('Fallback', () => {
  it('should reload window on click', () => {
    render(<Fallback />);

    const reloadButton = screen.getByRole('button', { name: /reload/i });

    act(() => {
      fireEvent.click(reloadButton);
    });

    expect(window.location.reload).toBeCalled();
    expect(window.location.reload).toBeCalledTimes(1);
  });
});
