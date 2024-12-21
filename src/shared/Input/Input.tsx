'use client';

import React, { forwardRef, useState } from 'react';
import Image from 'next/image';
import FileLabel from './component/FileLabel';
import styles from './Input.module.scss';

type InputProps = {
  type: string;
  id: string;
  title?: string;
  formError?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement | null, InputProps>(
  ({ type, id, title, formError, ...props }, ref) => {
    const [filePreviews, setFilePreviews] = useState<string[] | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;

      const fileList = Array.from(files);

      const validFiles = fileList.filter(
        (file) => file.size <= 5 * 1024 * 1024
      );
      const invalidFiles = fileList.filter(
        (file) => file.size > 5 * 1024 * 1024
      );

      if (invalidFiles.length > 0) {
        setErrorMessage('5MB 이하의 파일을 선택해주세요.');
        return;
      }

      setErrorMessage(null);
      const filePromises = validFiles.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = () =>
              reject('파일을 읽는 중 오류가 발생했습니다. 다시 시도해주세요.');
          })
      );

      Promise.all(filePromises)
        .then((fileUrls) => {
          setFilePreviews(fileUrls);
        })
        .catch((error) => {
          console.error('파일 읽기 에러:', error);
          setErrorMessage(error);
        });
    };

    type InfoMessageType = {
      nickname: string;
      password: string;
    };

    const INFO_MESSAGE: InfoMessageType = {
      nickname: '최대 10자 가능',
      password: '최소 8자 이상',
    };

    const handleTogglePassword = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className={styles.inputContainer}>
        {/* Label */}
        {type === 'file' ? (
          <FileLabel id={id} />
        ) : (
          title && (
            <label htmlFor={id} className={styles.label}>
              {title}
            </label>
          )
        )}

        {/* Input */}
        <input
          type={showPassword ? 'text' : type}
          id={id}
          ref={ref}
          onChange={type === 'file' ? handleFileChange : undefined}
          className={
            formError ? `${styles.input} ${styles.error}` : styles.input
          }
          {...props}
        />

        {/* 비밀번호 토글 */}
        {type === 'password' ? (
          <button type="button" onClick={handleTogglePassword}>
            {showPassword ? (
              <Image
                src={'/icon/ic-invisibility.svg'}
                alt={'비밀번호 숨기기 버튼'}
                width={100}
                height={100}
              />
            ) : (
              <Image
                src={'/icon/ic-visibility.svg'}
                alt={'비밀번호 보기 버튼'}
                width={100}
                height={100}
              />
            )}
          </button>
        ) : null}

        {/* 최소, 최대 글자수 알림 */}
        <div className={styles.infoMessage}>
          {INFO_MESSAGE[id as keyof InfoMessageType]}
        </div>

        {/* 리액트 훅 폼 에러 */}
        {formError && (
          <div className={styles.formErrorMessage}>{formError}</div>
        )}

        {/* 파일 에러 */}
        {errorMessage && <div>{errorMessage}</div>}

        {/* 이미지 프리뷰 */}
        {filePreviews &&
          filePreviews.map((preview, index) => (
            <Image
              key={index}
              src={preview}
              alt={`preview-${index}`}
              width={100}
              height={100}
            />
          ))}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
