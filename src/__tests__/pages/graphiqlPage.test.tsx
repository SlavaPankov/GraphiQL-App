import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { GraphiQLPage } from '@pages/GraphiQLPage';
import { Provider } from 'react-redux';
import store from '@store/store';

describe('GraphiQLPage', () => {
  afterEach(() => {
    cleanup();
  });

  it('GraphiQLPage renders without errors', () => {
    expect(() =>
      render(
        <Provider store={store}>
          <GraphiQLPage />
        </Provider>
      )
    ).not.toThrow();
  });
});
