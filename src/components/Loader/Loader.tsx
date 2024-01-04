import styles from './loader.module.scss';

export function Loader() {
  return (
    <div className={styles.ldsRing}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
