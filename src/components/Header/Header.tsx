import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { localizationContext } from '@context/LocalizationContext';
import { BaseButton } from '@components/BaseButton';

export function Header() {
  const { setLocale, translate } = useContext(localizationContext);
  const [language, changeLanguage] = useState(true);
  const handleClick = () => {
    changeLanguage(!language);
    setLocale(language ? 'en' : 'ru');
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
