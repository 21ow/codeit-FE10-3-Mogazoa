'use client';

import React, { forwardRef } from 'react';
import useInput from './hook/useInput';
import useTextCounter from '@/hook/useTextCounter';
import Label from './component/Label';
import PwToggleBtn from './component/PwToggleBtn';
import TextCount from '../TextCount';
// import InfoMessage from './component/InfoMessage';
import ErrorMessage from './component/ErrorMessage';
import FilePreview from './component/FilePreview';
import styles from './Input.module.scss';

type InputProps = {
  type: string;
  id: string;
  label?: string;
  maxLength?: number;
  multiple?: boolean;
  formErrorMessage?: string | null;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement | null, InputProps>(
  (
    {
      type,
      id,
      label,
      maxLength,
      multiple,
      formErrorMessage,
      className,
      ...props
    },
    ref
  ) => {
    const {
      showPassword,
      filePreviews,
      inputKey,
      fileErrorMessage,
      handleTogglePassword,
      handleFileChange,
      handleDeleteImg,
    } = useInput(multiple);

    const { text, handleTextCounter } = useTextCounter(maxLength);

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      type: string,
      id: string
    ) => {
      const handlers: { [key: string]: Function } = {
        file: handleFileChange,
        text_nickname: handleTextCounter,
      };
      const key = type === 'text' && id === 'nickname' ? 'text_nickname' : type;
      handlers[key]?.(e);
    };

    return (
      <div
        className={
          type === 'file'
            ? `${styles.inputContainer} ${styles.fileInput}`
            : styles.inputContainer
        }
      >
        <Label type={type} id={id} label={label} />
        <div className={styles.pwWrapper}>
          <input
            key={inputKey}
            type={showPassword ? 'text' : type}
            id={id}
            ref={ref}
            maxLength={maxLength}
            onChange={(e) => handleChange(e, type, id)}
            multiple={multiple}
            className={
              formErrorMessage
                ? `${styles.input} ${className} ${styles.errorStatus}`
                : `${styles.input} ${className}`
            }
            {...props}
          />
          <PwToggleBtn
            type={type}
            showPassword={showPassword}
            handleTogglePassword={handleTogglePassword}
          />
          <TextCount
            text={text}
            maxLength={maxLength}
            className={styles.textCount}
          />
        </div>

        {/* 디자인 변경 고려*/}
        {/* <InfoMessage id={id} /> */}
        <ErrorMessage
          formError={formErrorMessage}
          fileError={fileErrorMessage}
        />
        <FilePreview
          filePreviews={filePreviews}
          handleDeleteImg={handleDeleteImg}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
