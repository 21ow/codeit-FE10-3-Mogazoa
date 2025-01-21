import Link from 'next/link';
import Button from '@/shared/button/Button';
import styles from './UserDashboard.module.scss';
import { useUserActions } from '../hook/useUserActions';

type UserDashboardProps = {
  onClick?: () => void;
};

const UserDashboard = ({ onClick }: UserDashboardProps) => {
  const { handleLogout, token } = useUserActions({ onClick });

  return (
    <div className={styles.userDashboard}>
      <Link href="#" onClick={onClick}>
        마이페이지
      </Link>
      {token && (
        <Button className={styles.logoutBtn} onClick={handleLogout}>
          로그아웃
        </Button>
      )}
    </div>
  );
};

export default UserDashboard;
