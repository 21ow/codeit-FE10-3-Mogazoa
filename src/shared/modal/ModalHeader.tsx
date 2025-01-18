import styles from './ModalHeader.module.scss';
import Image from 'next/image';

interface ModalHeaderProps {
  headerText?: string;
  onClose?: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ headerText, onClose }) => {
  return (
    <div className={styles.container}>
      <p className={styles.headerText}>{headerText}</p>
      <button type="button" onClick={onClose}>
        <Image
          src={'/icon/ic-close.svg'}
          width={24}
          height={24}
          alt="닫기"
          className={styles.closeIcon}
        />
      </button>
    </div>
  );
};

export default ModalHeader;
