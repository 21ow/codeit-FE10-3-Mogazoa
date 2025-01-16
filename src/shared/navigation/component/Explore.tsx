import Link from 'next/link';
import AddItem from '/public/icon/ic-add-item.svg';
import Compare from '/public/icon/ic-compare.svg';
import styles from './Explore.module.scss';

const Explore = () => {
  return (
    <div className={styles.explore}>
      <Link href="#">
        <AddItem />
        <span>등록하기</span>
      </Link>
      <Link href="#">
        <Compare />
        <span>비교하기</span>
      </Link>
    </div>
  );
};

export default Explore;
