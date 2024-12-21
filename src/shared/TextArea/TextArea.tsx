'use client';

import React, { forwardRef } from 'react';
import { useState } from 'react';
import styles from './TextArea.module.scss';

type TextAreaProps = {
  id: string;
  className?: string;
  error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = forwardRef<HTMLTextAreaElement | null, TextAreaProps>(
  ({ id, className, error, ...props }, ref) => {
    const [text, setText] = useState<string>('');

    const handleTextCounter = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    };

    return (
      <div>
        <textarea
          id={id}
          ref={ref}
          onChange={handleTextCounter}
          {...props}
          className={`${styles.textarea} ${className}`}
        />

        {/* 리액트 훅 폼 에러 */}
        {error && <span>{error}</span>}

        {/* 글자수 표시 */}
        <div>{text.length}/500</div>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
export default TextArea;
