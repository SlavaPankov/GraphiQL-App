import classNames from 'classnames';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './iconButton.module.scss';

interface IIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly icon: ReactNode;
  readonly isActive?: boolean;
  readonly isFilled?: boolean;
}
export function IconButton({
  className,
  icon,
  isActive,
  isFilled,
  onClick,
  title,
}: IIconButtonProps) {
  return (
    <button
      className={classNames(
        styles.button,
        { [styles.active]: isActive },
        { [styles.filled]: isFilled },
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

IconButton.defaultProps = { isActive: false, isFilled: false };
