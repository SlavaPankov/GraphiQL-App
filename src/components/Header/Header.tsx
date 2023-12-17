import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { localizationContext } from '@context/LocalizationContext';
import { BaseButton } from '@components/BaseButton';
import { useAppSelector } from '@hooks/useAppSelector';

export function Header() {
  const { locale, setLocale, translate } = useContext(localizationContext);
  const handleClick = () => {
    setLocale(locale === 'ru' ? 'en' : 'ru');
  };

  const handleSignOutClick = () => {
    throw new Error('Put sign out function');
  };

  const isRegistered = useAppSelector(
    (state) => state.api.config.middlewareRegistered
  );

  return (
    <header>
      <nav>
        <Link to="/">{translate('To main')}</Link>
      </nav>
      <BaseButton label={translate('Language')} onClick={handleClick} />
      {isRegistered && (
        <button type="button" onClick={handleSignOutClick}>
          {translate('Sign out')}
        </button>
      )}
    </header>
  );
}
