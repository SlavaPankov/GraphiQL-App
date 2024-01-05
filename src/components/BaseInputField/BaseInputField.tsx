import { ChangeEvent } from 'react';
import classNames from 'classnames';
import styles from './baseInputField.module.scss';

interface IBaseInputField {
  id: string;
  type: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  error?: string;
}

export function BaseInputField({
  id,
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
}: IBaseInputField) {
  const inputClassName = classNames({
    [styles.input]: true,
    [styles.inputError]: error,
  });

  return (
    <label htmlFor={id} className={styles.label}>
      {label && <span className={styles.text}>{label}</span>}
      <input
        className={inputClassName}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={type === 'password' ? 'new-password' : 'off'}
      />
      {error && <span className={styles.error}>{error}</span>}
    </label>
  );
}

BaseInputField.defaultProps = {
  label: '',
  placeholder: '',
  error: '',
};
