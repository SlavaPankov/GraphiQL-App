import { BaseInputField } from '@components/BaseInputField';
import { EFormFieldsName } from '@type/enums/EFormFieldsName';
import { BaseButton } from '@components/BaseButton';
import { ChangeEvent, FormEvent, useContext, useRef, useState } from 'react';
import { localizationContext } from '@context/LocalizationContext';
import { object, ObjectSchema, string, ref } from 'yup';
import { IFormData } from '@type/interfaces/IFormData';
import { validationForm } from '@utils/validationForm.ts';
import styles from './singupForm.module.scss';

export function SignupForm() {
  const { translate, setLocale } = useContext(localizationContext);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const refForm = useRef<HTMLFormElement>(null);

  const schema: ObjectSchema<IFormData> = object({
    name: string()
      .required(translate('Field required'))
      .test({
        test(value, ctx) {
          if (!value) {
            return ctx.createError({ message: translate('Field required') });
          }

          if ([...value][0] !== [...value][0].toUpperCase()) {
            return ctx.createError({ message: translate('Name capitalize') });
          }

          return true;
        },
      }),
    email: string()
      .email(translate('Invalid format'))
      .required(translate('Field required')),
    password: string()
      .min(8, translate('Password length'))
      .matches(
        /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}\\[\]:;<>,.?~-]).{8,}$/,
        { message: translate('Password format') }
      )
      .required(translate('Field required')),
    confirmPassword: string()
      .oneOf([ref('password')], translate('Password match'))
      .required(translate('Field required')),
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [event.target.name]: '',
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = Object.fromEntries(
      new FormData(event.target as HTMLFormElement)
    ) as Record<string, string>;

    const { isValid, errors: validationErrors } = await validationForm(
      formData,
      schema
    );

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    // eslint-disable-next-line no-console
    console.log('submit');
  };

  return (
    <form ref={refForm} className={styles.form} onSubmit={handleSubmit}>
      <BaseInputField
        label={translate('Name')}
        onChange={handleChange}
        name={EFormFieldsName.name}
        id={EFormFieldsName.name}
        type="text"
        value={formValues[EFormFieldsName.name] || ''}
        error={errors[EFormFieldsName.name]}
      />
      <BaseInputField
        label={translate('Email')}
        onChange={handleChange}
        name={EFormFieldsName.email}
        id={EFormFieldsName.email}
        type="text"
        value={formValues[EFormFieldsName.email] || ''}
        error={errors[EFormFieldsName.email]}
      />
      <BaseInputField
        label={translate('Password')}
        onChange={handleChange}
        name={EFormFieldsName.password}
        id={EFormFieldsName.password}
        type="password"
        value={formValues[EFormFieldsName.password] || ''}
        error={errors[EFormFieldsName.password]}
      />
      <BaseInputField
        label={translate('Confirm password')}
        onChange={handleChange}
        name={EFormFieldsName.confirmPassword}
        id={EFormFieldsName.confirmPassword}
        type="password"
        value={formValues[EFormFieldsName.confirmPassword] || ''}
        error={errors[EFormFieldsName.confirmPassword]}
      />
      <BaseButton label={translate('Registration')} />
      <BaseButton
        label="En"
        type="button"
        onClick={() => {
          setLocale('en');
        }}
      />
      <BaseButton
        label="Ru"
        type="button"
        onClick={() => {
          setLocale('ru');
        }}
      />
    </form>
  );
}
