import { BaseButton } from '@components/BaseButton';
import { Heading } from '@components/Heading';
import { IconButton } from '@components/IconButton';
import { ChevronSVGIcon } from '@components/IconButton/icons';
import { Section } from '@components/Section';
import { useLocaleContext } from '@context/LocalizationContext';
import { TEditorMode } from '@type/types/TEditorMode';
import classNames from 'classnames';
import { HTMLAttributes, useState } from 'react';
import { Editor } from '../Editor';
import { QueryEditor } from '../QueryEditor';
import styles from './requestEditor.module.scss';

export function RequestEditor({
  className,
}: Readonly<HTMLAttributes<HTMLElement>>) {
  const { translate } = useLocaleContext();

  const [currentSubEditorMode, setCurrentSubEditorMode] =
    useState<TEditorMode>('none');
  const [lastSubEditorMode, setLastSubEditorMode] =
    useState<TEditorMode>('variables');

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
            onClick={() => {
              setCurrentSubEditorMode('variables');
              setLastSubEditorMode('variables');
            }}
          />
          <BaseButton
            label={translate('Headers')}
            mode="secondary"
            onClick={() => {
              setCurrentSubEditorMode('headers');
              setLastSubEditorMode('headers');
            }}
          />
        </div>
        <IconButton
          icon={<ChevronSVGIcon isActive={currentSubEditorMode !== 'none'} />}
          isActive={currentSubEditorMode !== 'none'}
          onClick={() => {
            setCurrentSubEditorMode(
              currentSubEditorMode === 'none' ? lastSubEditorMode : 'none'
            );
          }}
        />
      </div>
      {['headers', 'variables'].includes(currentSubEditorMode) && (
        <Section>
          <Editor mode={currentSubEditorMode} key={currentSubEditorMode} />
        </Section>
      )}
    </Section>
  );
}
