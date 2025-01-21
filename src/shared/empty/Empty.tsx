import Symbol from '/public/image/img-catbody.svg';
import styles from './Empty.module.scss';

const Empty = () => {
  return (
    <div className={styles.empty}>
      <div className={styles.symbolWrapper}>
        <Symbol />
        <div className={styles.bold}>?</div>
      </div>

      <h2>등록된 상품이 없어요.</h2>
      <h3>새로운 상품을 등록하고 첫 상품을 추가해 보세요!</h3>
    </div>
  );
};

export default Empty;
