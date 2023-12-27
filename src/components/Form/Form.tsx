/* eslint-disable @typescript-eslint/no-floating-promises */
import { BaseInputField } from '@components/BaseInputField';
import { EFormFieldsName } from '@type/enums/EFormFieldsName';
import { BaseButton } from '@components/BaseButton';
import { useContext, useEffect, useState } from 'react';
import { localizationContext } from '@context/LocalizationContext';
import { IFormData } from '@type/interfaces/IFormData';
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateSignupSchema } from '@hooks/useCreateSignupSchema.ts';
import styles from './form.module.scss';

interface ISignupFormProps {
  isSignup: boolean;
  onSubmit: SubmitHandler<IFormData>;
}

export function Form({ isSignup, onSubmit }: ISignupFormProps) {
  const { translate } = useContext(localizationContext);
  const { schema } = useCreateSignupSchema(isSignup);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<IFormData>({
    resolver: yupResolver(schema, { abortEarly: false }),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (!isMounted || !isSubmitted) {
      setIsMounted(true);
      return;
    }

    trigger();
  }, [trigger, schema, isSubmitted, isMounted]);

  const submitHandler: SubmitHandler<IFormData> = (data) => {
    setIsSubmitted(true);
    onSubmit(data);
  };

  const submitHandleError: SubmitErrorHandler<IFormData> = () => {
    setIsSubmitted(true);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(submitHandler, submitHandleError)}
    >
      {isSignup && (
        <Controller
          control={control}
          name={EFormFieldsName.name}
          render={({ field }) => (
            <BaseInputField
              type="text"
              label={translate('Name')}
              name={field.name}
              id={EFormFieldsName.name}
              value={field.value ?? ''}
              onChange={field.onChange}
              error={errors.name?.message}
            />
          )}
        />
      )}

      <Controller
        control={control}
        name={EFormFieldsName.email}
        render={({ field }) => (
          <BaseInputField
            type="text"
            label={translate('Email')}
            name={field.name}
            id={EFormFieldsName.email}
            value={field.value}
            onChange={field.onChange}
            error={errors.email?.message}
          />
        )}
      />
      <Controller
        control={control}
        name={EFormFieldsName.password}
        render={({ field }) => (
          <BaseInputField
            type="password"
            label={translate('Password')}
            name={field.name}
            id={EFormFieldsName.password}
            value={field.value}
            onChange={field.onChange}
            error={errors.password?.message}
          />
        )}
      />
      {isSignup && (
        <Controller
          control={control}
          name={EFormFieldsName.confirmPassword}
          render={({ field }) => (
            <BaseInputField
              type="password"
              label={translate('Confirm password')}
              name={field.name}
              id={EFormFieldsName.confirmPassword}
              value={field.value ?? ''}
              onChange={field.onChange}
              error={errors.confirmPassword?.message}
            />
          )}
        />
      )}
      <BaseButton
        disabled={Object.keys(errors).length > 0}
        label={isSignup ? translate('Registration') : translate('Signin')}
      />
    </form>
  );
}
