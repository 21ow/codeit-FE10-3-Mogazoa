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
    const [filePreviews, setFilePreviews] = useState<string[] | null>(null); //zustand로 마이그레이션

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      console.log(files);
      if (!files) return;

      const fileArray = Array.from(files);

      const validFiles = fileArray.filter(
        (file) => file.size <= 5 * 1024 * 1024
        //5MB 일 경우 에러 처리
      );

      const filePromises = validFiles.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
          })
      );

      Promise.all(filePromises)
        .then((fileUrls) => {
          setFilePreviews(fileUrls);
        })
        .catch((error) => {
          console.error('파일 읽기 에러:', error);
        });
    };

    return (
      <div>
        {title && <label htmlFor={id}>{title}</label>}
        <input ref={ref} onChange={handleFileChange} {...props} />
        {error && <span>{error}</span>}
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
