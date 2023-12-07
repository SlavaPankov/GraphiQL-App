import { HTMLAttributes, ReactNode, useContext } from 'react';
import { HeadingLevelContext } from '../../context/HeadingLevelContext';

interface ISectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function Section({ children, className }: Readonly<ISectionProps>) {
  const level = useContext(HeadingLevelContext);
  return (
    <section className={className}>
      <HeadingLevelContext.Provider value={level + 1}>
        {children}
      </HeadingLevelContext.Provider>
    </section>
  );
}
