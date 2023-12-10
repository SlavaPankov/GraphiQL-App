import { useContext } from 'react';
import { localizationContext } from '../../../context/LocalizationContext';

/**
 * Фасад для упрощенного доступа к контексту локализации
 * внутри компонента GraphqlApp
 */
export const useLocaleContext = () => useContext(localizationContext);
