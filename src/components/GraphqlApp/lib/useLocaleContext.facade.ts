import { Dispatch, SetStateAction, useContext } from 'react';
import { localizationContext } from '../../../context/LocalizationContext';
import { Locale } from '../../../types/types/Locale';

/**
 * Фасад для упрощенного доступа к контексту локализации
 * внутри компонента GraphqlApp
 */
export const useLocaleContext = () => {
  const ctx = useContext(localizationContext);
  /**
   * Проблема:
   * Невозможно обратиться к текущему значению стейта
   * из-за типа `(data: Locale) => void`
   *
   * Решение:
   * Замена типа `(data: Locale) => void` на `Dispatch<SetStateAction<Locale>>`
   * (это тип функции, передаваемой при инициализации контекста).
   *
   * Примечание:
   * `ctx.locale` - это НЕ текущее значение стейта.
   * `ctx.locale` - это значение снэпшота стейта на момент последнего рендера.
   *
   * https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state
   * */
  const setLocale = ctx.setLocale as Dispatch<SetStateAction<Locale>>;
  return { ...ctx, setLocale };
};
