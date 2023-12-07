import { HTMLAttributes } from 'react';
import { SidePanelMode } from '../../enums/SidePanelMode';
import { DocsExplorer } from '../DocsExplorer';
import { History } from '../History';

interface ISidePanelProps extends HTMLAttributes<HTMLElement> {
  mode: SidePanelMode;
}

export function SidePanel({ className, mode }: Readonly<ISidePanelProps>) {
  switch (mode) {
    case SidePanelMode.DOCS: {
      return <DocsExplorer className={className} />;
    }
    case SidePanelMode.HISTORY: {
      return <History className={className} />;
    }
    default: {
      return null;
    }
  }
}
