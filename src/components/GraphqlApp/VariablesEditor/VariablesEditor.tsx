import { Heading } from '@components/Heading';
import { Section } from '@components/Section';
import { useLocaleContext } from '@context/LocalizationContext';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { setGQLVariables } from '@store/graphqlQueryData/graphqlQueryDataSlice';
import { HTMLAttributes } from 'react';
import styles from './variablesEditor.module.scss';

export function VariablesEditor({
  className,
}: Readonly<HTMLAttributes<HTMLElement>>) {
  const { translate } = useLocaleContext();
  const value = useAppSelector((state) => state.graphqlQueryData.variables);
  const dispatch = useAppDispatch();

  return (
    <Section className={className}>
      <Heading className="visually-hidden">
        {translate('Variables Editor')}
      </Heading>
      <textarea
        className={styles.variablesEditorArea}
        placeholder={translate('Variables Editor')}
        rows={4}
        value={value}
        onChange={(e) => dispatch(setGQLVariables(e.target.value))}
      />
    </Section>
  );
}
