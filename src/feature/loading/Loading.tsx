import CatEyes from '/public/image/img-cateyes.svg';
import CatBody from '/public/image/img-catbody.svg';
import styles from './Loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.loadComponent}>
      <CatEyes className={styles.catEyes} width={50} height={40} />
      <CatBody className={styles.catBody} width={500} height={300} />
      <div className={styles.dotLoading}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </div>
  );
}
