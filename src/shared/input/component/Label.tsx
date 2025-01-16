import Image from 'next/image';
import styles from './Label.module.scss';
import { HTMLInputTypeAttribute } from 'react';

type LabelProps = {
  type: HTMLInputTypeAttribute;
  id: string;
  label?: string;
};

const Label = ({ type, id, label }: LabelProps) => {
  return type === 'file' ? (
    <label htmlFor={id} className={styles.fileLabel}>
      <Image
        src="/icon/ic-img-upload.svg"
        alt="이미지 업로드 버튼"
        width={34}
        height={34}
      />
    </label>
  ) : (
    label && (
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    )
  );
};

export default Label;
