import { Link } from 'react-router-dom';
import { Heading } from '@components/Heading';
import { BaseButton } from '@components/BaseButton';
import { useContext } from 'react';
import { ERoutes } from '../../types/enums/ERoutes';
import { localizationContext } from '../../context/LocalizationContext';

export function MainPage() {
  const { setLocale, translate } = useContext(localizationContext);

  const handleClick = () => {
    setLocale(Math.round(Math.random()) === 1 ? 'en' : 'ru');
  };

  return (
    <div className="container">
      <Heading />
      <Link to={ERoutes.about}>{translate('Not found')}</Link>
      <BaseButton label="click" onClick={handleClick} />
    </div>
  );
}
