import { ButtonHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './gqlAppButton.module.scss';

interface IGQLAppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly icon: ReactNode;
  readonly isActive?: boolean;
}
export function GQLAppButton({
  icon,
  onClick,
  title,
  className,
  isActive,
}: IGQLAppButtonProps) {
  return (
    <button
      className={classNames(
        styles.button,
        { [styles.active]: isActive },
        className
      )}
      type="button"
      onClick={onClick}
      title={title}
    >
      {icon}
    </button>
  );
}

GQLAppButton.defaultProps = { isActive: false };
