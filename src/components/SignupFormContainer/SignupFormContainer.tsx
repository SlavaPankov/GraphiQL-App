/* eslint-disable @typescript-eslint/no-floating-promises */
import { H1 } from '@components/Headings';
import { useContext } from 'react';
import classNames from 'classnames';
import { SubmitHandler } from 'react-hook-form';
import { localizationContext } from '@context/LocalizationContext';
import { Form } from '@components/Form';
import { IFormData } from '@type/interfaces/IFormData';
import { signupWithEmailAndPassword } from '@utils/signupWithEmailAndPassword.ts';
import { Link } from 'react-router-dom';
import { ERoutes } from '@type/enums/ERoutes';
import styles from './singupFormContainer.module.scss';

export function SignupFormContainer() {
  const { translate } = useContext(localizationContext);

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    signupWithEmailAndPassword(
      { name: data.name ?? '', email: data.email, password: data.password },
      translate
    );
  };

  return (
    <div className={classNames(styles.root, 'container')}>
      <H1 title={translate('Signup')} />
      <Form isSignup onSubmit={onSubmit} />
      <div className={styles.subscribe}>
        <span>{translate('Already login')}</span>
        <Link to={ERoutes.login}>{translate('Login')}</Link>
      </div>
    </div>
  );
}
