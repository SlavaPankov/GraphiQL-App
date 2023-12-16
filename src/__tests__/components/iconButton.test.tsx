import { IconButton } from '@components/IconButton';
import {
  ChevronSVGIcon,
  CopySVGIcon,
  DocsSVGIcon,
  PlaySVGIcon,
  PrettifySVGIcon,
  SettingsSVGIcon,
} from '@components/IconButton/icons';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { createElement } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('IconButton', () => {
  afterEach(() => {
    cleanup();
  });

  it.each([
    ChevronSVGIcon,
    CopySVGIcon,
    DocsSVGIcon,
    PlaySVGIcon,
    PrettifySVGIcon,
    SettingsSVGIcon,
  ])('IconButton button receives and renders svg icon', (iconComponent) => {
    render(<IconButton icon={createElement(iconComponent)} />);
    const button = screen.getByRole('button');
    const icon = document.querySelector('svg');
    expect(button).toContainElement(icon);
  });

  it('IconButton uses the received onClick callback on clicking', () => {
    const handleClick = vi.fn();
    render(<IconButton icon={<svg />} onClick={handleClick} />);
    const button = screen.getByRole('button');

    expect(handleClick).not.toBeCalled();
    for (let i = 1; i <= 5; i += 1) {
      fireEvent.click(button);
      expect(handleClick).toBeCalledTimes(i);
    }
  });
});
