import { Heading } from '@components/Heading';
import { Section } from '@components/Section';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('Heading', () => {
  const headingText = 'Some text';

  const createNestedSections = (levels: number): JSX.Element => {
    if (levels < 1) {
      throw new Error(`${levels} must be positive`);
    }

    return (
      <Section>
        <Heading>{headingText}</Heading>
        {levels > 1 ? createNestedSections(levels - 1) : null}
      </Section>
    );
  };

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('Heading throws error without HeadingLevelContext', () => {
    const errorText = /Must be within an Article or Section/i;

    vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
    expect(() => render(<Heading>{headingText}</Heading>)).toThrow(errorText);
  });

  it('Heading has an auto-leveling feature', () => {
    const nestingLevel = 6;
    render(createNestedSections(nestingLevel));

    for (let i = 1; i <= nestingLevel; i += 1) {
      const heading = screen.getByRole('heading', { level: i });
      expect(heading).toBeInTheDocument();
    }
  });

  it('Heading throws an error if the level is higher than 6', () => {
    const nestingLevel = 7;
    const errorText = /Unknown level: /i;

    vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
    expect(() => render(createNestedSections(nestingLevel))).toThrow(errorText);
  });
});
