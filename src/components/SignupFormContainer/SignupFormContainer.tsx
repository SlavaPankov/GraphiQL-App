import { H1 } from '@components/Headings';
import { useContext } from 'react';
import classNames from 'classnames';
import { localizationContext } from '@context/LocalizationContext';
import { SignupForm } from '@components/SignupFormContainer/SignupForm';
import styles from './singupFormContainer.module.scss';

export function SignupFormContainer() {
  const { translate } = useContext(localizationContext);

  const className = classNames('container', {
    [styles.container]: true,
  });

  return (
    <div className={className}>
      <H1 title={translate('Signup')} />
      <SignupForm />
    </div>
  );
}
