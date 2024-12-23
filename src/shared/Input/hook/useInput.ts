'use client';

import { useEffect, useState } from 'react';

const useInput = (multiple: boolean | undefined) => {
  const [showPassword, setShowPassword] = useState(false);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [inputKey, setInputKey] = useState<number>(0);
  const [fileErrorMessage, setFileErrorMessage] = useState<string | null>(null);

  const MAX_FILES = multiple ? 4 : 1;

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileList = Array.from(files);

    const validFiles = fileList.filter((file) => file.size <= 5 * 1024 * 1024);
    const invalidFiles = fileList.filter((file) => file.size > 5 * 1024 * 1024);

    if (invalidFiles.length > 0) {
      setFileErrorMessage('5MB 이하의 파일을 선택해주세요.');
      return;
    }

    setFileErrorMessage(null);
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
        setFilePreviews((prev) => {
          const totalFiles = prev.length + fileUrls.length;

          if (totalFiles > MAX_FILES) {
            if (MAX_FILES === 1) return fileUrls;

            setFileErrorMessage(
              `최대 ${MAX_FILES}개까지만 업로드할 수 있습니다.`
            );
            return prev;
          }
          setFileErrorMessage(null);
          return [...prev, ...fileUrls];
        });

        setInputKey((prevKey) => prevKey + 1);
      })
      .catch((error) => {
        console.error('파일 읽기 에러:', error);
        setFileErrorMessage(error);
      });

    console.log('파일 리스트: ', files);
  };

  const handleDeleteImg = (index: number) => {
    setFilePreviews((prev) => prev && prev.filter((_, i) => i !== index));
    setFileErrorMessage(null);
    setInputKey((prevKey) => prevKey + 1);
  };

  useEffect(() => console.log('파일 프리뷰: ', filePreviews));

  return {
    showPassword,
    filePreviews,
    inputKey,
    fileErrorMessage,
    handleTogglePassword,
    handleFileChange,
    handleDeleteImg,
  };
};

export default useInput;
