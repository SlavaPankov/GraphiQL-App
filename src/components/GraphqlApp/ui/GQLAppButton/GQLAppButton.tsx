import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './gqlAppButton.module.scss';

interface IGQLAppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly icon: ReactNode;
}
export function GQLAppButton({ icon, onClick, title }: IGQLAppButtonProps) {
  return (
    <button
      className={styles.button}
      type="button"
      onClick={onClick}
      title={title}
    >
      {icon}
    </button>
  );
}
