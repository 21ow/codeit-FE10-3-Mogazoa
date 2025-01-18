import Link from 'next/link';
import AddItem from '/public/icon/ic-add-item.svg';
import Compare from '/public/icon/ic-compare.svg';
import styles from './NavMenu.module.scss';

const NavMenu = () => {
  return (
    <div className={styles.NavMenu}>
      <Link href="/add-product">
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

export default NavMenu;
