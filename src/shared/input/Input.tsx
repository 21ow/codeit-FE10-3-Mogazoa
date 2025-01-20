'use client';

import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { mergeRefs } from 'react-merge-refs';
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
  customInput?: string;
  customFileInput?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement | null, InputProps>(
  (
    {
      type = 'text',
      label,
      maxLength,
      multiple,
      formErrorMessage,
      customInput,
      customFileInput,
      ...props
    },
    ref
  ) => {
    const { toggleRef, showPassword, handleTogglePassword } =
      usePasswordToggle();

    const {
      filePreviews,
      inputKey,
      fileErrorMessage,
      handleFileChange,
      handleDeleteImg,
    } = useImageUpload(multiple);

    const id = useId();

    const { text, handleTextCounter } = useTextCounter(maxLength);

    const inputContainerClassName = classNames(styles.inputContainer, {
      [styles.multipleFileOption]: type === 'file' && multiple,
      [styles.singleFileOption]: type === 'file' && !multiple,
    });

    const inputClassName = classNames(customInput || styles.input, {

      [styles.errorStatus]: formErrorMessage,
    });

    const { onChange, ...rest } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }

      if (type === 'file') {
        handleFileChange(e);
      } else {
        handleTextCounter(e);
      }
    };

    return (
      <div className={inputContainerClassName}>
        <Label type={type} id={id} label={label} className={customFileInput} />
        <div className={styles.inputWrapper}>
          <input
            key={inputKey}
            type={showPassword ? 'text' : type}
            id={id}
            ref={mergeRefs([ref, toggleRef])}
            maxLength={maxLength}
            onChange={handleChange}
            multiple={multiple}
            className={inputClassName}
            {...rest}
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
          type={type}
          filePreviews={filePreviews}
          handleDeleteImg={handleDeleteImg}
          multiple={multiple}
          className={customFileInput}

        />
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
