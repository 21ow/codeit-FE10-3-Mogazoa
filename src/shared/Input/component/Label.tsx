import Image from 'next/image';
import styles from './Label.module.scss';

type LabelProps = {
  type: string;
  id: string;
  title?: string;
};

const Label = ({ type, id, title }: LabelProps) => {
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
    title && (
      <label htmlFor={id} className={styles.label}>
        {title}
      </label>
    )
  );
};

export default Label;
