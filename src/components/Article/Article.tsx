import { HTMLAttributes, ReactNode, useContext } from 'react';
import { HeadingLevelContext } from '../../context/HeadingLevelContext';

interface IArticleProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function Article({ children, className }: Readonly<IArticleProps>) {
  const level = useContext(HeadingLevelContext);
  return (
    <article className={className}>
      <HeadingLevelContext.Provider value={level + 1}>
        {children}
      </HeadingLevelContext.Provider>
    </article>
  );
}
