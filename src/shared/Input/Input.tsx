'use client';

import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { useId } from 'react';
import usePasswordToggle from './hook/usePasswordToggle';
import useImageUpload from './hook/useImageUpload';
import useTextCounter from '@/hook/useTextCounter';
import Label from './component/Label';
import PwToggleBtn from './component/PwToggleBtn';
import TextCount from '../TextCount';
import ErrorMessage from './component/ErrorMessage';
import FilePreview from './component/FilePreview';
import styles from './Input.module.scss';

type InputProps = {
  label?: string;
  formErrorMessage?: string | null;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement | null, InputProps>(
  (
    {
      type = 'text',
      label,
      maxLength,
      multiple,
      formErrorMessage,
      className,
      ...props
    },
    ref
  ) => {
    const { showPassword, handleTogglePassword } = usePasswordToggle();

    const {
      filePreviews,
      inputKey,
      fileErrorMessage,
      handleFileChange,
      handleDeleteImg,
    } = useImageUpload(multiple);

    const id = useId();

    const { text, handleTextCounter } = useTextCounter(maxLength);

    const inputClassName = classNames(styles.input, className, {
      [styles.errorStatus]: formErrorMessage,
    });

    return (
      <div
        className={
          type === 'file'
            ? `${styles.inputContainer} ${styles.fileInput}`
            : styles.inputContainer
        }
      >
        <Label type={type} id={id} label={label} />
        <div className={styles.inputWrapper}>
          <input
            key={inputKey}
            type={showPassword ? 'text' : type}
            id={id}
            ref={ref}
            maxLength={maxLength}
            onChange={(e) =>
              type === 'file' ? handleFileChange(e) : handleTextCounter(e)
            }
            multiple={multiple}
            className={inputClassName}
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
