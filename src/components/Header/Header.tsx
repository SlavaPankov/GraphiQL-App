import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { localizationContext } from '@context/LocalizationContext';
import { BaseButton } from '@components/BaseButton';

export function Header() {
  const { locale, setLocale, translate } = useContext(localizationContext);
  const handleClick = () => {
    setLocale(locale === 'ru' ? 'en' : 'ru');
  };

  return (
    <header>
      <nav>
        <Link to="/">{translate('To main')}</Link>
      </nav>
      <BaseButton label={translate('Language')} onClick={handleClick} />
    </header>
  );
}
