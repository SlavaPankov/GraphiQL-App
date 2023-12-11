import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { GraphiQLPage } from '@pages/GraphiQLPage';

describe('GraphiQLPage', () => {
  afterEach(() => {
    cleanup();
  });

  it('GraphiQLPage renders without errors', () => {
    expect(() => render(<GraphiQLPage />)).not.toThrow();
  });
});
