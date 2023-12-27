import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import { MainLayout } from '@components/MainLayout';

describe('mainLayout Component', () => {
  it('renders main tag and Footer with data-testid="footer"', () => {
    render(
      <Router>
        <MainLayout />
      </Router>
    );

    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();

    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });
});
