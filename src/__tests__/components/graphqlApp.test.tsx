import { GraphqlApp } from '@components/GraphqlApp';
import { DocsExplorer } from '@components/GraphqlApp/DocsExplorer';
import { HeadersEditor } from '@components/GraphqlApp/HeadersEditor';
import { History } from '@components/GraphqlApp/History';
import { QueryEditor } from '@components/GraphqlApp/QueryEditor';
import { RequestEditor } from '@components/GraphqlApp/RequestEditor';
import { ResponseSection } from '@components/GraphqlApp/ResponseSection';
import { Sidebar } from '@components/GraphqlApp/Sidebar';
import { VariablesEditor } from '@components/GraphqlApp/VariablesEditor';
import store from '@store/store';
import { cleanup, render } from '@testing-library/react';
import { createElement } from 'react';
import { Provider } from 'react-redux';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('GraphqlApp component', () => {
  afterEach(() => {
    cleanup();
  });

  it.each(
    [
      GraphqlApp,
      DocsExplorer,
      HeadersEditor,
      History,
      QueryEditor,
      RequestEditor,
      ResponseSection,
      VariablesEditor,
    ].map((component) => ({ name: component.name, component }))
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
          sidePanelMode="none"
          handleDocsClick={callback}
          handleHistoryClick={callback}
          handleReloadClick={callback}
          handleKeyboardShortcutClick={callback}
          handleSettingsClick={callback}
        />
      )
    ).not.toThrow();
  });
});
