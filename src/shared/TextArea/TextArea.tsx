'use client';

import TextCount from '../TextCount';
import useTextCounter from '@/hook/useTextCounter';
import styles from './TextArea.module.scss';

const TextArea = ({
  className,
  maxLength,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const { text, handleTextCounter } = useTextCounter(maxLength);
  return (
    <div className={styles.textareaWrapper}>
      <textarea
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
