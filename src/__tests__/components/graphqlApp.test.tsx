import { GraphqlApp } from '@components/GraphqlApp';
import { DocsExplorer } from '@components/GraphqlApp/DocsExplorer';
import { QueryEditor } from '@components/GraphqlApp/QueryEditor';
import { RequestEditor } from '@components/GraphqlApp/RequestEditor';
import { ResponseSection } from '@components/GraphqlApp/ResponseSection';
import { Sidebar } from '@components/GraphqlApp/Sidebar';
import store from '@store/store';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { createElement } from 'react';
import { Provider } from 'react-redux';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouterWithStore } from '../cfg/testUtils';

describe('GraphqlApp component', () => {
  afterEach(() => {
    cleanup();
  });

  it.each(
    [GraphqlApp, DocsExplorer, QueryEditor, RequestEditor, ResponseSection].map(
      (component) => ({ name: component.name, component })
    )
  )('$name component renders without errors', ({ component }) => {
    expect(() =>
      render(<Provider store={store}>{createElement(component)}</Provider>)
    ).not.toThrow();
  });

  it("'Sidebar' component renders without errors", () => {
    const callback = vi.fn();
    expect(() =>
      render(
        <Sidebar
          isDocsOpen={false}
          handleDocsClick={callback}
          handleSettingsClick={callback}
        />
      )
    ).not.toThrow();
  });

  it('Clicking Docs button open/close Docs Explorer', async () => {
    render(<MemoryRouterWithStore element={<GraphqlApp />} />);

    const docsButton = screen.getByTestId('sidebar-docs-button');

    expect(screen.queryByTestId(/docs-explorer/i)).toBeNull();
    fireEvent.click(docsButton);
    const docsExplorer = await screen.findByTestId(/docs-explorer/i);
    expect(docsExplorer).toBeVisible();

    fireEvent.click(docsButton);
    expect(docsExplorer).not.toBeVisible();
  });

  it('Clicking Settings button open change endpoint form', () => {
    render(<MemoryRouterWithStore element={<GraphqlApp />} />);

    const settingsButton = screen.getByTestId('sidebar-settings-button');

    expect(screen.queryByTestId(/change-endpoint-form/i)).toBeNull();
    fireEvent.click(settingsButton);
    expect(screen.getByTestId(/change-endpoint-form/i)).toBeVisible();
  });
});
