import Image from 'next/image';
import CloseIcon from '../../../public/icon/ic-close.svg';
import styles from './ModalHeader.module.scss';

interface ModalHeaderProps {
  headerText?: string;
  onClose?: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ headerText, onClose }) => {
  return (
    <div className={styles.container}>
      <p>{headerText}</p>
      <button type="button" onClick={onClose}>
        <Image src={CloseIcon} alt="close" />
      </button>
    </div>
  );
};

export default ModalHeader;
