import { IconButton } from '@components/IconButton';
import {
  CopySVGIcon,
  PlaySVGIcon,
  PrettifySVGIcon,
} from '@components/IconButton/icons';
import { Section } from '@components/Section';
import { useLocaleContext } from '@context/LocalizationContext';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { useLazyGetGraphQLResponseQuery } from '@store/graphqlApi/graphqlApi';
import { setGQLResponse } from '@store/graphqlQueryData/graphqlQueryDataSlice';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import { toast } from 'react-toastify';
import { Editor } from '../Editor';
import styles from './queryEditor.module.scss';

export function QueryEditor({
  className,
}: Readonly<HTMLAttributes<HTMLElement>>) {
  const { translate } = useLocaleContext();
  const value = useAppSelector((state) => state.graphqlQueryData.query);
  const dispatch = useAppDispatch();
  const [executeQuery] = useLazyGetGraphQLResponseQuery();

  return (
    <Section className={classNames(className, styles.queryEditorSection)}>
      <Editor mode="query" />
      <div className={styles.queryEditorButtons}>
        <IconButton
          icon={<PlaySVGIcon />}
          title={translate('Execute query')}
          onClick={async () => {
            const { data } = await executeQuery({});
            dispatch(setGQLResponse(JSON.stringify(data, null, 2)));
          }}
          isFilled
        />
        <IconButton
          icon={<PrettifySVGIcon />}
          title={translate('Prettify query')}
          onClick={() => {
            toast.error('Handler not implemented');
          }}
        />
        <IconButton
          icon={<CopySVGIcon />}
          title={translate('Copy query')}
          onClick={async () => {
            await navigator.clipboard.writeText(value);
            toast.success(translate('Query copied'));
          }}
        />
      </div>
    </Section>
  );
}
