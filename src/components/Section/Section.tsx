import {
  HeadingLevelContext,
  useHeadingLevelContext,
} from '@context/HeadingLevelContext';
import { HTMLAttributes, ReactNode } from 'react';

interface ISectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function Section({ children, className }: Readonly<ISectionProps>) {
  const level = useHeadingLevelContext();
  return (
    <section className={className}>
      <HeadingLevelContext.Provider value={level + 1}>
        {children}
      </HeadingLevelContext.Provider>
    </section>
  );
}
