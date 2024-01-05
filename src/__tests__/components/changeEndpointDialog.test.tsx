import { ChangeEndpointDialog } from '@components/GraphqlApp/ChangeEndpointDialog';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouterWithStore } from '../cfg/testUtils';

describe('ChangeEndpointDialog', () => {
  afterEach(() => {
    cleanup();
  });

  it('ChangeEndpointDialog renders without errors', () => {
    expect(() =>
      render(
        <MemoryRouterWithStore
          element={
            <ChangeEndpointDialog
              handleConfirmClick={vi.fn()}
              handleDiscardClick={vi.fn()}
            />
          }
        />
      )
    ).not.toThrow();
  });
});
