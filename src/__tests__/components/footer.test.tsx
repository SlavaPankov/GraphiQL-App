import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { Footer } from '@components/Footer';

describe('Footer component', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it('renders', () => {
    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });

  it('renders 3 students links', () => {
    const studentLinks = screen.getAllByRole('listitem');
    expect(studentLinks).toHaveLength(3);
  });

  it('renders the correct date', () => {
    const dateElement = screen.getByText(/2023/i);
    expect(dateElement).toBeInTheDocument();
  });

  it('renders the logo with a link to rs.school', () => {
    const logoLinkElement = screen.getByRole('link', { name: /rs.school/i });
    expect(logoLinkElement).toHaveAttribute('href', 'https://rs.school');
    expect(logoLinkElement).toHaveAttribute('target', '_blank');
    expect(logoLinkElement).toHaveAttribute('rel', 'noreferrer');
  });
});
