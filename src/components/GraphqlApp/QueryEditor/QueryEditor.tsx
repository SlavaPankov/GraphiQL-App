import { Heading } from '@components/Heading';
import { IconButton } from '@components/IconButton';
import {
  CopySVGIcon,
  MergeSVGIcon,
  PlaySVGIcon,
  PrettifySVGIcon,
} from '@components/IconButton/icons';
import { Section } from '@components/Section';
import { useLocaleContext } from '@context/LocalizationContext';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { useLazyGetGraphQLResponseQuery } from '@store/graphqlApi/graphqlApi';
import {
  setGQLQuery,
  setGQLResponse,
} from '@store/graphqlQueryData/graphqlQueryDataSlice';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import styles from './queryEditor.module.scss';

export function QueryEditor({
  className,
}: Readonly<HTMLAttributes<HTMLElement>>) {
  const { translate } = useLocaleContext();
  const value = useAppSelector((state) => state.graphqlQueryData.query);
  const dispatch = useAppDispatch();
  const [executeQuery] = useLazyGetGraphQLResponseQuery();

  const handleClick = () => {
    throw new Error('Handler not implemented');
  };

  return (
    <Section className={classNames(className, styles.queryEditorSection)}>
      <Heading className="visually-hidden">{translate('Query Editor')}</Heading>
      <textarea
        placeholder={translate('Query Editor')}
        className={styles.queryEditorArea}
        value={value}
        onChange={(e) => dispatch(setGQLQuery(e.target.value))}
      />
      <div className={styles.queryEditorButtons}>
        <IconButton
          icon={<PlaySVGIcon />}
          title={translate('Execute query')}
          onClick={() => {
            executeQuery({})
              .then(({ data }) => {
                dispatch(setGQLResponse(data ?? ''));
              })
              .catch((e) => {
                if (e instanceof Error) {
                  dispatch(setGQLResponse(JSON.stringify(e)));
                }
              });
          }}
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
