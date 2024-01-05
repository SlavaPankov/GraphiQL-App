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
import { TextareaHTMLAttributes } from 'react';
import styles from './editor.module.scss';

type TUseSpecificStore = (
  mode: TEditorMode
) => readonly [unknown, (value: string) => ReturnType<AppDispatch>];
type TGetDispatch = <T>(
  fn: ActionCreatorWithPayload<T>
) => (value: T) => ReturnType<AppDispatch>;

const useSpecificStore: TUseSpecificStore = (mode) => {
  const state = useAppSelector(({ graphqlQueryData }) => graphqlQueryData);
  const appDispatch = useAppDispatch();
  const getDispatch: TGetDispatch = (fn) => (value) => appDispatch(fn(value));

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
    response: 'JSON Viewer',
    none: '',
  };
  return translate(headings[mode]);
};

const formatStateValue = (stateValue: unknown): string => {
  if (typeof stateValue === 'string') {
    return stateValue;
  }
  const value = JSON.stringify(stateValue, null, 2);
  return value === '{}' ? '' : value;
};

export function Editor({ mode }: { readonly mode: TEditorMode }) {
  const [state, setState] = useSpecificStore(mode);
  const heading = useTranslatedHeadingTitle(mode);

  const isSubEditor = ['headers', 'variables'].includes(mode);
  const isQueryEditor = mode === 'query';
  const isResponseViewer = mode === 'response';

  const textAreaProps: TextareaHTMLAttributes<HTMLTextAreaElement> = {
    placeholder: heading,
    className: classNames({
      [styles.subEditorArea]: isSubEditor,
      [styles.queryEditorArea]: isQueryEditor,
      [styles.jsonViewerArea]: isResponseViewer,
      [styles.invalid]: isSubEditor && formatStateValue(state) === '',
    }),
    readOnly: isResponseViewer,
  };

  if (isQueryEditor || isSubEditor) {
    textAreaProps.onChange = (e) => setState(e.target.value);
  }
  if (isQueryEditor || isResponseViewer) {
    textAreaProps.value = formatStateValue(state);
  }
  if (isSubEditor) {
    textAreaProps.defaultValue = formatStateValue(state);
    textAreaProps.rows = 4;
  }

  return (
    <>
      <Heading className="visually-hidden">{heading}</Heading>
      <textarea {...textAreaProps} />
    </>
  );
}
