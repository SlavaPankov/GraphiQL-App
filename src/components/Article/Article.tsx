import {
  HeadingLevelContext,
  useHeadingLevelContext,
} from '@context/HeadingLevelContext';
import { HTMLAttributes, ReactNode } from 'react';

interface IArticleProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  testId?: string;
}

export function Article({
  children,
  className,
  testId,
}: Readonly<IArticleProps>) {
  const level = useHeadingLevelContext();
  return (
    <article className={className} data-testid={testId}>
      <HeadingLevelContext.Provider value={level + 1}>
        {children}
      </HeadingLevelContext.Provider>
    </article>
  );
}
