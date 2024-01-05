import { render, waitFor } from '@testing-library/react';
import { UseLocalizationContext } from '@context/LocalizationContext';
import { NotFound } from '@components/NotFound';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import store from '@store/store';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

function prepare() {
  const router = createMemoryRouter([
    {
      path: '/',
      element: (
        <Provider store={store}>
          <UseLocalizationContext>
            <NotFound />
          </UseLocalizationContext>
        </Provider>
      ),
    },
  ]);

  return render(<RouterProvider router={router} />);
}

describe('Not found', () => {
  it('should render component', async () => {
    const { getByRole } = prepare();

    await waitFor(() => getByRole('heading', { level: 1 }));

    expect(getByRole('heading', { level: 1 })).toHaveTextContent(
      'Страница не найдена'
    );
  });
});
