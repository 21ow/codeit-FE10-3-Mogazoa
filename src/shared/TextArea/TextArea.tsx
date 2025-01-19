'use client';

import React, { forwardRef } from 'react';
import TextCount from '../TextCount';
import useTextCounter from '@/hook/useTextCounter';
import ErrorMessage from '../input/component/ErrorMessage';
import styles from './TextArea.module.scss';

type TextAreaProps = {
  formErrorMessage?: string | null;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = forwardRef<HTMLTextAreaElement | null, TextAreaProps>(
  ({ maxLength, className, formErrorMessage, ...props }, ref) => {
    const { text, handleTextCounter } = useTextCounter(maxLength);

    const { onChange, ...rest } = props;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) {
        onChange(e);
      }

      handleTextCounter(e);
    };

    return (
      <div className={styles.textareaWrapper}>
        <textarea
          ref={ref}
          maxLength={maxLength}
          onChange={handleChange}
          {...rest}
          className={`${styles.textarea} ${className}`}
        />

        <ErrorMessage formError={formErrorMessage} />

        <TextCount
          text={text}
          maxLength={maxLength}
          className={styles.textCount}
        />
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
export default TextArea;
