'use client';

import { useState } from 'react';

const useTextCounter = (maxLength: number | undefined) => {
  const [text, setText] = useState<string>('');

  const handleTextCounter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!maxLength) return;

    const userText = e.target.value;
    if (userText.length <= maxLength) {
      setText(userText);
      //한국어 입력 시 초과 글자는 포커스 아웃해야 사라짐
    }
  };

  return { text, handleTextCounter };
};

export default useTextCounter;
