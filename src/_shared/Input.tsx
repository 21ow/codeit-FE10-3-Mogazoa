'use client';

import React, { forwardRef } from 'react';
import { useState } from 'react';
import Image from 'next/image';

type Props = {
  id?: string;
  title?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ id, title, error, ...props }, ref) => {
    const [filePreview, setFilePreview] = useState<string | null>(null); //zustand로 마이그레이션

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        //에러 처리 추가
        setFilePreview(null);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    };
    return (
      <div>
        {title && <label htmlFor={id}>{title}</label>}
        <input
          ref={ref}
          accept="image/*"
          onChange={handleFileChange}
          {...props}
        />
        {error && <span>{error}</span>}
        {filePreview && (
          <Image src={filePreview} alt="preview" width={100} height={100} /> //alt 파일명으로 변경
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
