import { Heading } from '@components/Heading';
import { Section } from '@components/Section';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

describe('Section', () => {
  afterEach(() => {
    cleanup();
  });

  it('Section is rendered with the given child element', () => {
    const childElementText = 'Some text';
    const childElement = <Heading>{childElementText}</Heading>;

    render(<Section>{childElement}</Section>);

    const article = document.querySelector('section');
    const heading = screen.getByRole('heading', { name: childElementText });
    expect(article).toContainElement(heading);
  });
});
