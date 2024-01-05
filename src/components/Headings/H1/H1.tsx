import styles from './h1.module.scss';

interface IH1Props {
  title: string;
}

export function H1({ title }: IH1Props) {
  return <h1 className={styles.heading}>{title}</h1>;
}
