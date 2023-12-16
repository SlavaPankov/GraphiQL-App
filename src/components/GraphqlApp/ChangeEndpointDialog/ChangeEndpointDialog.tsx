import { BaseButton } from '@components/BaseButton';
import { useLocaleContext } from '@context/LocalizationContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultEndpoint } from '@store/graphqlQueryData/graphqlQueryDataSlice';
import classNames from 'classnames';
import { HTMLAttributes, useEffect, useId } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form } from 'react-router-dom';
import * as yup from 'yup';
import { useAppSelector } from '@hooks/useAppSelector';
import styles from './changeEndpointDialog.module.scss';

const urlSchema = yup.object({
  endpoint: yup.string().url('Invalid URL').required('Required field'),
});

interface IFormFields {
  endpoint: string;
}

interface IChangeEndpointDialogProps extends HTMLAttributes<HTMLElement> {
  handleDiscardClick: () => void;
  handleConfirmClick: SubmitHandler<IFormFields>;
}

export function ChangeEndpointDialog({
  handleDiscardClick,
  handleConfirmClick,
}: Readonly<IChangeEndpointDialogProps>) {
  const id = useId();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormFields>({
    mode: 'onChange',
    resolver: yupResolver(urlSchema),
  });
  const { translate } = useLocaleContext();
  const defaultValue = useAppSelector((store) => store.graphqlQueryData.url);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const errorMessage = errors.endpoint?.message ?? '';

  return (
    <div className={styles.background}>
      <Form
        navigate={false}
        noValidate
        onSubmit={handleSubmit(handleConfirmClick)}
        className={styles.form}
      >
        <fieldset className={styles.fieldset}>
          <legend>{translate('Change Endpoint')}</legend>
          <span className={styles.errorMessage}>{translate(errorMessage)}</span>
          <label htmlFor={id}>
            <span className="visually-hidden">URL:</span>
            <input
              {...register('endpoint')}
              className={classNames(styles.input, {
                [styles.invalid]: errorMessage,
              })}
              autoComplete="off"
              type="url"
              placeholder={defaultEndpoint}
              defaultValue={defaultValue}
              id={id}
            />
          </label>
          <div className={styles.buttons}>
            <BaseButton label="✖" type="button" onClick={handleDiscardClick} />
            <BaseButton type="submit" label="✔" />
          </div>
        </fieldset>
      </Form>
    </div>
  );
}
