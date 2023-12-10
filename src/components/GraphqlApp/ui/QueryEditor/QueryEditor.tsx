import { Heading } from '@components/HeadingLeveled';
import { IconButton } from '@components/IconButton';
import {
  CopySVGIcon,
  MergeSVGIcon,
  PlaySVGIcon,
  PrettifySVGIcon,
} from '@components/IconButton/icons';
import { Section } from '@components/Section';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import { useLocaleContext } from '../../../../context/LocalizationContext';
import styles from './queryEditor.module.scss';

export function QueryEditor({
  className,
}: Readonly<HTMLAttributes<HTMLElement>>) {
  const { translate } = useLocaleContext();

  const handleClick = () => {
    throw new Error('Handler not implemented');
  };

  return (
    <Section className={classNames(className, styles.queryEditorSection)}>
      <Heading className="visually-hidden">{translate('Query Editor')}</Heading>
      <textarea
        placeholder={translate('Query Editor')}
        className={styles.queryEditorArea}
      />
      <div>
        <IconButton
          icon={<PlaySVGIcon />}
          title={translate('Execute query')}
          onClick={handleClick}
          isFilled
        />
        <IconButton
          icon={<PrettifySVGIcon />}
          title={translate('Prettify query')}
          onClick={handleClick}
        />
        <IconButton
          icon={<MergeSVGIcon />}
          title={translate('Merge fragments into query')}
          onClick={handleClick}
        />
        <IconButton
          icon={<CopySVGIcon />}
          title={translate('Copy query')}
          onClick={handleClick}
        />
      </div>
    </Section>
  );
}
