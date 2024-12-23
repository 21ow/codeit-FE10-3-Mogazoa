'use client';

import TextCount from '../TextCount';
import useTextCounter from '@/hook/useTextCounter';
import styles from './TextArea.module.scss';

type TextAreaProps = {
  id: string;
  className?: string;
  maxLength: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = ({ id, className, maxLength, ...props }: TextAreaProps) => {
  const { text, handleTextCounter } = useTextCounter(maxLength);
  return (
    <div className={styles.textareaWrapper}>
      <textarea
        id={id}
        maxLength={maxLength}
        onChange={handleTextCounter}
        {...props}
        className={`${styles.textarea} ${className}`}
      />
      <TextCount
        text={text}
        maxLength={maxLength}
        className={styles.textCount}
      />
    </div>
  );
};

TextArea.displayName = 'TextArea';
export default TextArea;
