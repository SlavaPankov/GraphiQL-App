import { Heading } from '@components/Heading';
import { useLocaleContext } from '@context/LocalizationContext';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import {
  setGQLHeaders,
  setGQLQuery,
  setGQLResponse,
  setGQLVariables,
} from '@store/graphqlQueryData/graphqlQueryDataSlice';
import { AppDispatch } from '@store/store';
import { TEditorMode } from '@type/types/TEditorMode';
import classNames from 'classnames';
import styles from './editor.module.scss';

type TGetDispatch = () => <T>(
  fn: ActionCreatorWithPayload<T>
) => (value: T) => ReturnType<AppDispatch>;

const useGetDispatch: TGetDispatch = () => {
  const appDispatch = useAppDispatch();
  return (fn) => (value) => appDispatch(fn(value));
};

type TFormatStateValue = (value: unknown) => string;
const formatStateValue: TFormatStateValue = (stateValue) => {
  if (typeof stateValue === 'string') {
    return stateValue;
  }
  const value = JSON.stringify(stateValue, null, 2);
  return value === '{}' ? '' : value;
};

type TUseSpecificStore = (
  mode: TEditorMode
) => readonly [unknown, (value: string) => ReturnType<AppDispatch>];
const useSpecificStore: TUseSpecificStore = (mode) => {
  const state = useAppSelector(({ graphqlQueryData }) => graphqlQueryData);
  const getDispatch = useGetDispatch();

  switch (mode) {
    case 'headers': {
      return [state.headers, getDispatch(setGQLHeaders)];
    }
    case 'variables': {
      return [state.variables, getDispatch(setGQLVariables)];
    }
    case 'query': {
      return [state.query, getDispatch(setGQLQuery)];
    }
    case 'response': {
      return [state.response, getDispatch(setGQLResponse)];
    }
    default: {
      throw new Error('Unexpected Editor Mode!');
    }
  }
};

const useTranslatedHeadingTitle = (mode: TEditorMode): string => {
  const { translate } = useLocaleContext();
  const headings: Record<TEditorMode, string> = {
    headers: 'Headers Editor',
    variables: 'Variables Editor',
    query: 'Query Editor',
    response: 'Response Editor',
    none: '',
  };
  return translate(headings[mode]);
};

export function EditorViewer({ mode }: { readonly mode: TEditorMode }) {
  const [state, setState] = useSpecificStore(mode);
  const heading = useTranslatedHeadingTitle(mode);

  return (
    <>
      <Heading className="visually-hidden">{heading}</Heading>
      <textarea
        className={classNames({
          [styles.subEditorArea]: ['headers', 'variables'].includes(mode),
        })}
        placeholder={heading}
        rows={4}
        onChange={(e) => setState(e.target.value)}
        defaultValue={formatStateValue(state)}
      />
    </>
  );
}
