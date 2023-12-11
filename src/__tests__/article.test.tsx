import { Article } from '@components/Article';
import { Heading } from '@components/HeadingLeveled';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

describe('Article', () => {
  afterEach(() => {
    cleanup();
  });

  it('Article is rendered with the given child element', () => {
    const childElementText = 'Some text';
    const childElement = <Heading>{childElementText}</Heading>;

    render(<Article>{childElement}</Article>);

    const article = screen.getByRole('article');
    const heading = screen.getByRole('heading', { name: childElementText });
    expect(article).toContainElement(heading);
  });
});
