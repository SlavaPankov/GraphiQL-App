import { BaseButton } from '@components/BaseButton';
import { GraphqlApp } from '@components/GraphqlApp';
import classNames from 'classnames';
import { useLocaleContext } from '../../context/LocalizationContext';
import styles from './graphiqlPage.module.scss'; // ? временно добавил styles.page до замены времянок на настоящие HEADER и FOOTER

export function GraphiQLPage() {
  const { locale, setLocale } = useLocaleContext();

  const handleLangButtonClick = () => {
    setLocale((prev) => (prev === 'ru' ? 'en' : 'ru'));
  };

  return (
    <div className={classNames('container', styles.page)}>
      {/* временно добавил styles.page до замены времянок на настоящие HEADER и FOOTER */}

      {/* TODO ⬇ заменить на настоящий HEADER */}
      <header>
        <BaseButton
          label={`header: ${locale}`}
          onClick={handleLangButtonClick}
        />
      </header>
      {/* TODO ⬆ заменить на настоящий HEADER */}

      <GraphqlApp />

      {/* TODO ⬇ заменить на настоящий FOOTER */}
      <footer>
        <BaseButton label="footer" />
      </footer>
      {/* TODO ⬆ заменить на настоящий FOOTER */}
    </div>
  );
}
