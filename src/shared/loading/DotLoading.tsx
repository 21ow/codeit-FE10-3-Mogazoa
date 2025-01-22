import styles from './styles.module.scss';

const DotLoading: React.FC = () => {
  return (
    <div className={styles.dotLoading}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  );
};
export default DotLoading;
