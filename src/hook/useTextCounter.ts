'use client';

import { useState } from 'react';

const useTextCounter = (maxLength: number | undefined) => {
  const [text, setText] = useState<number>(0);

  const handleTextCounter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!maxLength) return;

    const userText = e.target.value.length;
    console.log(userText);
    if (userText <= maxLength) {
      setText(userText);
    }
  };
  //https://yungis.dev/react/textarea-maxlength-limit/

  return { text, handleTextCounter };
};

export default useTextCounter;
