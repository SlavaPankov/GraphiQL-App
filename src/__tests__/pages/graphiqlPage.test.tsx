import * as AuthGateModule from '@components/AuthGate';
import { GraphiQLPage } from '@pages/GraphiQLPage';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouterWithStore } from '../cfg/testUtils';

describe('GraphiQLPage', () => {
  afterEach(() => {
    cleanup();
  });

  it('GraphiQLPage renders without errors', () => {
    const authGateSpy = vi.spyOn(AuthGateModule, 'AuthGate');
    authGateSpy.mockImplementationOnce(({ children }) => children);

    expect(() =>
      render(<MemoryRouterWithStore element={<GraphiQLPage />} />)
    ).not.toThrow();

    authGateSpy.mockRestore();
  });
});
