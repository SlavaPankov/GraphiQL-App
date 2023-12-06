import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from '../App';

describe('App', () => {
  it.todo('should render heading', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Hello world!'
    );
  });
});
