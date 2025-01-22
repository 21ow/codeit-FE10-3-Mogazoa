import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { userQuery } from '@/api/query';
import { useUserActions } from '../hook/useUserActions';
import Image from 'next/image';
import Dropdown from '@/shared/dropdown/Dropdown';
import useDropdownStore from '@/shared/dropdown/useDropdownStore';
import styles from './UserProfile.module.scss';

const UserProfile = () => {
  const { data } = useQuery(userQuery.all());

  const { dropdowns, openDropdown, closeDropdown } = useDropdownStore();
  const dropdownId = useRef('selectUserAction');
  const divRef = useRef<HTMLDivElement>(null);

  const { handleLogout, goToMyPage } = useUserActions();

  const userDropdown = dropdowns[dropdownId.current];
  const userDropdownView = userDropdown?.isVisible;
  const selectActions = userDropdown?.selectedOption;

  const options = ['마이페이지', '로그아웃'];

  const toggleDropdown = () => {
    if (userDropdownView) {
      closeDropdown(dropdownId.current);
    } else {
      openDropdown(dropdownId.current);
    }
  };

  const handleClose = () => {
    closeDropdown(dropdownId.current);
    if (!selectActions) return;

    if (selectActions === '마이페이지') {
      goToMyPage();
    } else {
      handleLogout();
    }
  };

  return (
    data && (
      <div className={styles.userProfileWrapper}>
        <div
          ref={divRef}
          onClick={toggleDropdown}
          role="listbox"
          className={styles.userProfile}
        >
          <Image src={data.image} alt="프로필 사진" width={28} height={28} />
        </div>
        {userDropdownView && (
          <Dropdown
            onClose={handleClose}
            options={options}
            dropdownId={dropdownId.current}
            parentRef={divRef}
            customDropdownStyle={styles.customDropdownStyle}
            customTop={10}
            customLeft={-95}
          />
        )}

        <div className={styles.nickname}>{data.nickname}</div>
      </div>
    )
  );
};

export default UserProfile;
