import CatEyes from '/public/image/img-cateyes.svg';
import CatBody from '/public/image/img-catbody.svg';
import styles from './styles.module.scss';

const CatLoading: React.FC = () => {
  return (
    <div className={styles.catLoading}>
      <CatBody className={styles.catBody} width={500} height={300} />
      <CatEyes className={styles.catEyes} width={50} height={40} />
    </div>
  );
};

export default CatLoading;
