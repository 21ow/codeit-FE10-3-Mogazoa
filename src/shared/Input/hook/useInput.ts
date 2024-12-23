import { useState } from 'react';

const useInput = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [filePreviews, setFilePreviews] = useState<string[] | null>(null);
  const [inputKey, setInputKey] = useState<number>(0);
  const [fileErrorMessage, setFileErrorMessage] = useState<string | null>(null);

  // const MAX_FILES = 4;

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileList = Array.from(files);

    // if (filePreviews && filePreviews.length + fileList.length === MAX_FILES) {
    //   setFileErrorMessage(`최대 ${MAX_FILES}개까지만 업로드할 수 있습니다.`);
    //   return;
    // }

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
        setFilePreviews(fileUrls);
        setInputKey((prevKey) => prevKey + 1);
      })
      .catch((error) => {
        console.error('파일 읽기 에러:', error);
        setFileErrorMessage(error);
      });

    console.log(filePreviews?.length, fileList.length);
  };

  const handleDeleteImg = (index: number) => {
    setFilePreviews((prev) => prev && prev.filter((_, i) => i !== index));
    setInputKey((prevKey) => prevKey + 1);
  };

  // 파일 개수 제한, 파일 중복 선택 가능
  // 배열에 자리가 있을 때 추가로 이미지를 업로드하면 기존 배열이 전부 삭제되는 문제
  // 프리뷰랑 파일리스트랑 불일치 문제
  // 파일 선택한 순서가 아니라, 로컬 순서대로? 업로드 되는 문제
  // 업로드 된 파일이 있는 상태에서 라벨을 누르면 프리뷰 초기화가 안되는 문제

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
