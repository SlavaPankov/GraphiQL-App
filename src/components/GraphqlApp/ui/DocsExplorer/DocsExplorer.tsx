import { Article } from '@components/Article';
import { Heading } from '@components/HeadingLeveled';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import styles from './docsExplorer.module.scss';

export function DocsExplorer({
  className,
}: Readonly<HTMLAttributes<HTMLElement>>) {
  return (
    <Article className={classNames(className, styles.parent)}>
      <Heading>DocsExplorer</Heading>
      <div>content</div>
    </Article>
  );
}
