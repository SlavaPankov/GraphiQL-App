/* eslint-disable @typescript-eslint/no-floating-promises */
import { useContext } from 'react';
import { localizationContext } from '@context/LocalizationContext';
import classNames from 'classnames';
import styles from '@components/SignupFormContainer/singupFormContainer.module.scss';
import { SubmitHandler } from 'react-hook-form';
import { IFormData } from '@type/interfaces/IFormData';
import { H1 } from '@components/Headings';
import { Form } from '@components/Form';
import { loginWithEmailAndPassword } from '@utils/loginWithEmailAndPassword';
import { Link } from 'react-router-dom';
import { ERoutes } from '@type/enums/ERoutes';

export function LoginFormContainer() {
  const { translate } = useContext(localizationContext);

  const className = classNames('container', {
    [styles.container]: true,
  });

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    loginWithEmailAndPassword(
      { email: data.email, password: data.password },
      translate
    );
  };

  return (
    <div className={className}>
      <H1 title={translate('Login')} />
      <Form isSignup={false} onSubmit={onSubmit} />
      <div className={styles.subscribe}>
        <span>{translate('New user')}</span>
        <Link to={ERoutes.signup}>{translate('Signup')}</Link>
      </div>
    </div>
  );
}
