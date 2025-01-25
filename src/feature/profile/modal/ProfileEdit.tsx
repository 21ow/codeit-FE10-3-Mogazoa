'use client';

import { useState, useEffect } from 'react';
import Modal from '@/shared/modal/Modal';
import Button from '@/shared/button/Button';
import { patchUsersMe } from '@/api/userApi';
import { PatchUserRequest } from '@/api/type/User';
import ImageContain from '@/feature/landingpage/ReviewModal/ImageContain';
import Image from 'next/image';
import styles from './styles.module.scss';
import { useQuery } from '@tanstack/react-query';
import { userQuery } from '@/api/query';

interface ProfileEditModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ProfileEditModal = ({
  isVisible,
  onClose,
  onConfirm,
}: ProfileEditModalProps) => {
  const { data: user, isLoading } = useQuery(userQuery.all());
  const [nickname, setNickname] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (isVisible && user) {
      setNickname(user.nickname || '');
      setDescription(user.description || '');
      setImage(user.image || null);
    }
  }, [isVisible, user]);

  const handleSubmitProfile = async () => {
    const updatedProfile: PatchUserRequest = {
      nickname,
      description,
      image: image || '',
    };

    try {
      await patchUsersMe(updatedProfile);
      onConfirm();
      onClose();
    } catch (error) {
      alert('프로필 수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleImageUrlChange = (url: string | null) => {
    if (!image) {
      setImage(url);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const isButtonDisabled =
    nickname.trim() === '' || description.trim() === '' || isLoading;

  return (
    isVisible && (
      <Modal
        headerText="프로필 수정"
        onClose={onClose}
        isVisible={isVisible}
        customModalContentStyle={styles.profileModal}
        customOverlay={styles.customOverlay}
      >
        <div className={styles.profileBody}>
          {image && (
            <div className={styles.imagePreview}>
              <Image
                src={image}
                alt="현재 프로필 이미지"
                width={170}
                height={170}
              />
              <button
                className={styles.deleteButton}
                onClick={handleRemoveImage}
              >
                x
              </button>
            </div>
          )}

          {!image && (
            <ImageContain
              setImageUrl={handleImageUrlChange}
              showPreview={true}
              width={30}
              height={30}
              className={styles.imageUpload}
            />
          )}

          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 작성하세요"
            className={styles.nicknameInput}
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="자기소개를 입력하세요"
            className={styles.descriptionInput}
            maxLength={300}
          />

          <Button
            className={styles.saveButton}
            onClick={handleSubmitProfile}
            disabled={isButtonDisabled}
          >
            저장하기
          </Button>
        </div>
      </Modal>
    )
  );
};

export default ProfileEditModal;
