import { useEffect, useRef, ReactNode } from 'react';
import styles from './Modal.module.scss';
import ModalHeader from './ModalHeader';

interface ModalProps {
  headerText?: string;
  children?: ReactNode;
  customModalContainerStyle?: string;
  customOverlay?: string;
  customModalContentStyle?: string;
  onClose?: () => void;
  buttonClick?: () => void;
  isVisible?: boolean;
  customVisible?: string;
  customHidden?: string;
  customHeader?: ReactNode;
}

const Modal = ({
  headerText = '',
  children = null,
  customModalContainerStyle = '',
  customOverlay = '',
  customModalContentStyle = '',
  onClose = () => {},
  buttonClick = () => {},
  isVisible = false,
  customVisible = '',
  customHidden = '',
  customHeader = null,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableElement = useRef<HTMLButtonElement>(null);
  const lastFocusableElement = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalRef.current) {
        modalRef.current.classList.remove(customVisible || styles.visible);
        modalRef.current.classList.add(
          customHidden ? customHidden : styles.hidden
        );
        modalRef.current.addEventListener('animationend', () => {
          onClose();
        });
      }
    };

    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else document.body.style.overflow = '';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isVisible, onClose]);

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      modalRef.current.classList.remove(customVisible || styles.visible);
      modalRef.current.classList.add(
        customHidden ? customHidden : styles.hidden
      );
      modalRef.current.addEventListener('animationend', () => {
        onClose();
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      buttonClick();
    }
  };

  return (
    <div
      className={customOverlay || styles.overlay}
      onClick={
        handleOutsideClick as unknown as React.MouseEventHandler<HTMLDivElement>
      }
      onKeyUp={handleKeyPress}
      role="button"
      tabIndex={0}
    >
      <div
        ref={modalRef}
        className={`${customModalContainerStyle || styles.container} ${customVisible || styles.visible}`}
      >
        {customHeader || (
          <ModalHeader headerText={headerText} onClose={onClose} />
        )}
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
