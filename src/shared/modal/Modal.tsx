import { useEffect, useRef, ReactNode } from 'react';
import styles from './Modal.module.scss';
import ModalHeader from './ModalHeader';

interface ModalProps {
  headerText?: string;
  children?: ReactNode;
  customModalContainerStyle?: string;
  customModalContentStyle?: string;
  onClose?: () => void;
  buttonClick?: () => void;
  isVisible?: boolean;
  customHeader?: ReactNode;
}

const Modal = ({
  headerText = '',
  children = null,
  customModalContainerStyle = '',
  customModalContentStyle = '',
  onClose = () => {},
  buttonClick = () => {},
  isVisible = false,
  customHeader = null,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isVisible, onClose]);

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      buttonClick();
    }
  };

  return (
    <div
      className={styles.overlay}
      onClick={
        handleOutsideClick as unknown as React.MouseEventHandler<HTMLDivElement>
      }
      onKeyUp={handleKeyPress}
      role="button"
      tabIndex={0}
    >
      <div
        ref={modalRef}
        className={`${customModalContainerStyle ? customModalContainerStyle : styles.container} ${isVisible ? styles.visible : styles.hidden}`}
      >
        {customHeader ||
          (headerText && (
            <ModalHeader headerText={headerText} onClose={onClose} />
          ))}
        <div
          className={`${customModalContentStyle ? customModalContentStyle : styles.content}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
