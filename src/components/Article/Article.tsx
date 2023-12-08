import { HTMLAttributes, ReactNode } from 'react';
import {
  HeadingLevelContext,
  useHeadingLevelContext,
} from '../../context/HeadingLevelContext';

interface IArticleProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function Article({ children, className }: Readonly<IArticleProps>) {
  const level = useHeadingLevelContext();
  return (
    <article className={className}>
      <HeadingLevelContext.Provider value={level + 1}>
        {children}
      </HeadingLevelContext.Provider>
    </article>
  );
}
