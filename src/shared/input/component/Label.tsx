import { HTMLInputTypeAttribute } from 'react';
import Image from 'next/image';
import styles from './Label.module.scss';
import classNames from 'classnames';


type LabelProps = {
  type: HTMLInputTypeAttribute;
  id: string;
  label?: string;
  className?: string;
};


const Label = ({ type, id, label, className }: LabelProps) => {
  return type === 'file' ? (
    <label htmlFor={id} className={classNames(className, styles.fileLabel)}>

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
