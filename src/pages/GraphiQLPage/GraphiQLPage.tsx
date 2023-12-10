import { BaseButton } from '@components/BaseButton';
import { GraphqlApp } from '@components/GraphqlApp';
import { useLocaleContext } from '@components/GraphqlApp/lib/useLocaleContext.facade';
import classNames from 'classnames';
import styles from './graphiqlPage.module.scss'; // ? временно добавил styles.page до замены времянок на настоящие HEADER и FOOTER

export function GraphiQLPage() {
  /**
   * Проблема:
   * Невозможно обратиться к текущему значению State
   * из-за типа `(data: Locale) => void`
   *
   * Решение:
   * Замена типа `(data: Locale) => void` на `Dispatch<SetStateAction<Locale>>`
   * (это изначальный тип функции `setLocale`, получаемый при использовании `useState`).
   *
   * Примечание:
   * `ctx.locale` - это НЕ текущее значение State.
   * `ctx.locale` - это значение снэпшота State на момент последнего рендера.
   *
   * https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state
   * */
  const { locale, setLocale } = useLocaleContext();

  // ? временно добавил styles.page до замены времянок на настоящие HEADER и FOOTER
  return (
    <div className={classNames('container', styles.page)}>
      {/* TODO ⬇ заменить на настоящий HEADER */}
      <header>
        <BaseButton label={`header: ${locale}`} disabled />
        <BaseButton
          label="en"
          onClick={() => {
            setLocale('en');
          }}
        />
        <BaseButton
          label="ru"
          onClick={() => {
            setLocale('ru');
          }}
        />
      </header>

      <GraphqlApp />

      {/* TODO ⬇ заменить на настоящий FOOTER */}
      <footer>
        <BaseButton label="footer" />
      </footer>
    </div>
  );
}
