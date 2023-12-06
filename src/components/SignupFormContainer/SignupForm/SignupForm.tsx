import { BaseInputField } from '@components/BaseInputField';
import { EFormFieldsName } from '@type/enums/EFormFieldsName';
import { BaseButton } from '@components/BaseButton';
import { ChangeEvent, useContext, useState } from 'react';
import { localizationContext } from '@context/LocalizationContext';
import styles from './singupForm.module.scss';

export function SignupForm() {
  const { translate } = useContext(localizationContext);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

    setErrors({});
  };

  return (
    <form className={styles.form}>
      <BaseInputField
        label={translate('Name')}
        onChange={handleChange}
        name={EFormFieldsName.name}
        id={EFormFieldsName.name}
        type="text"
        value={formValues[EFormFieldsName.name]}
        error={errors[EFormFieldsName.name]}
      />
      <BaseInputField
        label={translate('Email')}
        onChange={handleChange}
        name={EFormFieldsName.email}
        id={EFormFieldsName.email}
        type="text"
        value={formValues[EFormFieldsName.email]}
        error={errors[EFormFieldsName.email]}
      />
      <BaseInputField
        label={translate('Password')}
        onChange={handleChange}
        name={EFormFieldsName.password}
        id={EFormFieldsName.password}
        type="password"
        value={formValues[EFormFieldsName.password]}
        error={errors[EFormFieldsName.password]}
      />
      <BaseInputField
        label={translate('Confirm password')}
        onChange={handleChange}
        name={EFormFieldsName.confirmPassword}
        id={EFormFieldsName.confirmPassword}
        type="password"
        value={formValues[EFormFieldsName.confirmPassword]}
        error={errors[EFormFieldsName.confirmPassword]}
      />
      <BaseButton label={translate('Registration')} />
    </form>
  );
}
