import { useHeadingLevelContext } from '@context/HeadingLevelContext';
import classNames from 'classnames';
import { HTMLAttributes, ReactNode } from 'react';
import styles from './heading.module.scss';

interface IHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export function Heading({ children, className }: Readonly<IHeadingProps>) {
  const level = useHeadingLevelContext();
  switch (level) {
    case 0: {
      throw new Error('Must be within an Article or Section');
    }
    case 1: {
      return <h1 className={classNames(styles.h1, className)}>{children}</h1>;
    }
    case 2: {
      return <h2 className={classNames(styles.h2, className)}>{children}</h2>;
    }
    case 3: {
      return <h3 className={classNames(styles.h3, className)}>{children}</h3>;
    }
    case 4: {
      return <h4 className={classNames(styles.h4, className)}>{children}</h4>;
    }
    case 5: {
      return <h5 className={classNames(styles.h5, className)}>{children}</h5>;
    }
    case 6: {
      return <h6 className={classNames(styles.h6, className)}>{children}</h6>;
    }
    default: {
      throw Error(`Unknown level: ${level}`);
    }
  }
}
