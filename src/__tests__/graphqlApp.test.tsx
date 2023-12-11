import { GraphqlApp } from '@components/GraphqlApp';
import { DocsExplorer } from '@components/GraphqlApp/ui/DocsExplorer';
import { HeadersEditor } from '@components/GraphqlApp/ui/HeadersEditor';
import { History } from '@components/GraphqlApp/ui/History';
import { QueryEditor } from '@components/GraphqlApp/ui/QueryEditor';
import { RequestEditor } from '@components/GraphqlApp/ui/RequestEditor';
import { ResponseSection } from '@components/GraphqlApp/ui/ResponseSection';
import { Sidebar } from '@components/GraphqlApp/ui/Sidebar';
import { VariablesEditor } from '@components/GraphqlApp/ui/VariablesEditor';
import { cleanup, render } from '@testing-library/react';
import { createElement } from 'react';
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
    expect(() => render(createElement(component))).not.toThrow();
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
