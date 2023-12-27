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
import {
  setGQLQuery,
  setGQLResponse,
} from '@store/graphqlQueryData/graphqlQueryDataSlice';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { Editor } from '../Editor';
import styles from './queryEditor.module.scss';

export function QueryEditor({
  className,
}: Readonly<HTMLAttributes<HTMLElement>>) {
  const { translate } = useLocaleContext();
  const value = useAppSelector((state) => state.graphqlQueryData.query);
  const dispatch = useAppDispatch();
  const [executeQuery] = useLazyGetGraphQLResponseQuery();

  function tokenize(query: string): string[] {
    const pattern = /\s+|([,:{}()\\[\]])/g;
    return query
      .split(pattern)
      .filter((token) => token && token.trim() !== '' && token.trim() !== ',');
  }

  function formatTokens(tokens: string[], spaces: number): string {
    let indentationLevel = 0;
    let beautifiedQuery = '';
    let isInner = false;
    let isRound = false;

    tokens.forEach((token, index) => {
      if (token === '(') {
        isRound = true;
        beautifiedQuery += token;
      } else if (token === ')') {
        isRound = false;
        beautifiedQuery += token;
      } else if (token === '{' && !isRound) {
        beautifiedQuery += ` {\n${' '.repeat((indentationLevel + 1) * spaces)}`;
        indentationLevel += 1;
        isInner = true;
      } else if (token === '}' && !isRound) {
        indentationLevel -= 1;
        beautifiedQuery +=
          indentationLevel > 0
            ? `\n${' '.repeat(indentationLevel * spaces)}}\n${' '.repeat(
                indentationLevel * spaces
              )}`
            : `\n${' '.repeat(indentationLevel * spaces)}}`;
        isInner = false;
      } else if (token === ':') {
        beautifiedQuery += `${token} `;
      } else {
        beautifiedQuery += `${token}${
          isInner &&
          indentationLevel > 2 &&
          tokens[index + 1] &&
          tokens[index + 1] !== '}'
            ? `\n${' '.repeat(indentationLevel * spaces)}`
            : ''
        }`;
      }
    });

    return beautifiedQuery
      .split('\n')
      .filter((item) => item.trimEnd() !== '')
      .join('\n');
  }

  function beautifyGraphQL(query: string, spaces = 2): string {
    const tokens = tokenize(query);
    return formatTokens(tokens, spaces);
  }

  const handlePrettifyClick = () => {
    dispatch(setGQLQuery(beautifyGraphQL(value, 2)));
  };

  return (
    <Section className={classNames(className, styles.queryEditorSection)}>
      <Editor mode="query" />
      <div className={styles.queryEditorButtons}>
        <IconButton
          icon={<PlaySVGIcon />}
          title={translate('Execute query')}
          onClick={async () => {
            const { data, error } = await executeQuery({});
            if (error) {
              toast.error(translate('Bad request'));
              dispatch(
                setGQLResponse(
                  JSON.stringify((error as FetchBaseQueryError).data, null, 2)
                )
              );
              return;
            }

            dispatch(setGQLResponse(JSON.stringify(data, null, 2)));
          }}
          isFilled
        />
        <IconButton
          icon={<PrettifySVGIcon />}
          title={translate('Prettify query')}
          onClick={handlePrettifyClick}
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
