import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MainLayout } from '@components/MainLayout';
import { MemoryRouter } from '../cfg/testUtils';

describe('mainLayout Component', () => {
  it('renders main tag and Footer with data-testid="footer"', async () => {
    render(<MemoryRouter element={<MainLayout />} />);

    const mainElement = await screen.findByRole('main');
    expect(mainElement).toBeInTheDocument();

    const footerElement = await screen.findByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });
});
