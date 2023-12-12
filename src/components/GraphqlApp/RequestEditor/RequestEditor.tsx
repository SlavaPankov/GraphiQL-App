import { BaseButton } from '@components/BaseButton';
import { Heading } from '@components/Heading';
import { IconButton } from '@components/IconButton';
import { ChevronSVGIcon } from '@components/IconButton/icons';
import { Section } from '@components/Section';
import { useLocaleContext } from '@context/LocalizationContext';
import { TSubEditorMode } from '@type/types/TSubEditorMode';
import classNames from 'classnames';
import { HTMLAttributes, useState } from 'react';
import { HeadersEditor } from '../HeadersEditor';
import { QueryEditor } from '../QueryEditor';
import { VariablesEditor } from '../VariablesEditor';
import styles from './requestEditor.module.scss';

export function RequestEditor({
  className,
}: Readonly<HTMLAttributes<HTMLElement>>) {
  const { translate } = useLocaleContext();

  const [currentSubEditorMode, setCurrentSubEditorMode] =
    useState<TSubEditorMode>('none');
  const [lastSubEditorMode, setLastSubEditorMode] =
    useState<TSubEditorMode>('variables');

  const handleVariablesClick = () => {
    setCurrentSubEditorMode('variables');
    setLastSubEditorMode('variables');
  };
  const handleHeadersClick = () => {
    setCurrentSubEditorMode('headers');
    setLastSubEditorMode('headers');
  };
  const handleCollapseClick = () => {
    setCurrentSubEditorMode(
      currentSubEditorMode === 'none' ? lastSubEditorMode : 'none'
    );
  };

  return (
    <Section className={classNames(className, styles.requestEditorSection)}>
      <Heading className="visually-hidden">
        {translate('Request Editor')}
      </Heading>
      <QueryEditor className={styles.queryEditorSection} />
      <div className={styles.buttonSection}>
        <div className={styles.subEditorTabs}>
          <BaseButton
            label={translate('Variables')}
            mode="secondary"
            onClick={handleVariablesClick}
          />
          <BaseButton
            label={translate('Headers')}
            mode="secondary"
            onClick={handleHeadersClick}
          />
        </div>
        <IconButton
          icon={<ChevronSVGIcon isActive={currentSubEditorMode !== 'none'} />}
          isActive={currentSubEditorMode !== 'none'}
          onClick={handleCollapseClick}
        />
      </div>
      {currentSubEditorMode === 'variables' && <VariablesEditor />}
      {currentSubEditorMode === 'headers' && <HeadersEditor />}
    </Section>
  );
}
