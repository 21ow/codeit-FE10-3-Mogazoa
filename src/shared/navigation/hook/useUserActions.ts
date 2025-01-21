import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

type UserActionsProps = {
  onClick?: () => void;
};

export const useUserActions = ({ onClick }: UserActionsProps = {}) => {
  const { token, clearToken } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    clearToken();
    if (onClick) onClick();
  };

  const goToMyPage = () => {
    router.push('/mypage');
  };

  return { token, handleLogout, goToMyPage };
};
