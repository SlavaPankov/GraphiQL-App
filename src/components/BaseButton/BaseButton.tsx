/* eslint-disable react/button-has-type */
import { MouseEvent } from 'react';
import classNames from 'classnames';
import styles from './baseButton.module.scss';

interface IBaseButtonProps {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  mode?: 'primary' | 'secondary';
  isActive?: boolean;
}

export function BaseButton({
  label,
  type,
  onClick,
  disabled,
  mode,
  isActive,
}: Readonly<IBaseButtonProps>) {
  const className = classNames({
    [styles.primary]: mode === 'primary',
    [styles.secondary]: mode === 'secondary',
    [styles.active]: isActive,
  });

  return (
    <button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

BaseButton.defaultProps = {
  type: 'submit',
  onClick: () => {},
  disabled: false,
  mode: 'primary',
};
