import { useEffect, useRef, CSSProperties } from 'react';
import styles from './Dropdown.module.scss';
import useDropdownStore from './useDropdownStore';
import { createPortal } from 'react-dom';

interface DropdownProps {
  options: string[];
  dropdownId: string;
  parentRef: React.RefObject<HTMLElement>;
  onClose: () => void;
  customDropdownStyle?: string;
  customItemStyle?: string;
  buttonClick?: () => void;
  isVisible?: boolean;
  customVisible?: string;
  customHidden?: string;
  customTop?: number;
  customLeft?: number;
}

const Dropdown = ({
  options,
  dropdownId,
  parentRef,
  customDropdownStyle = '',
  customItemStyle = '',
  onClose = () => {},
  isVisible = false,
  customVisible = '',
  customHidden = '',
  customTop,
  customLeft,
}: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { dropdowns } = useDropdownStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && dropdownRef.current) {
        dropdownRef.current.classList.remove(customVisible || styles.visible);
        dropdownRef.current.classList.add(
          customHidden ? customHidden : styles.hidden
        );
        dropdownRef.current.addEventListener('animationend', () => {
          onClose();
        });
        onClose();
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !parentRef?.current?.contains(e.target as Node)
      ) {
        dropdownRef.current.classList.remove(customVisible || styles.visible);
        dropdownRef.current.classList.add(
          customHidden ? customHidden : styles.hidden
        );
        dropdownRef.current.addEventListener('animationend', () => {
          onClose();
        });
        onClose();
      }
    };

    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else document.body.style.overflow = '';

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClick);
      document.body.style.overflow = '';
    };
  }, [isVisible, onClose, customVisible, customHidden, parentRef]);

  const handleItemClick = (value: string) => {
    if (!dropdowns[dropdownId].selectedOption) {
      dropdowns[dropdownId].selectedOption = value;
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(e.key);
    //화살표로도 드롭다운 컨트롤 할 수 있게 수정
  };

  const parentRect = parentRef.current?.getBoundingClientRect();

  const dropdownStyle: CSSProperties = {
    top: `${(parentRect?.bottom || 0) + (customTop || 0)}px`,
    left: `${(parentRect?.left || 0) + (customLeft || 0)}px`,
  };

  return (
    <>
      {createPortal(
        <div
          ref={dropdownRef}
          className={`${customDropdownStyle || styles.dropdown} ${customVisible || styles.visible}`}
          style={dropdownStyle}
          onKeyUp={handleKeyPress}
          role="button"
          tabIndex={0}
        >
          {options.map((option, index) => (
            <div
              className={`${customItemStyle || styles.item}`}
              key={index}
              onClick={() => handleItemClick(option)}
              tabIndex={index++}
            >
              {option}
            </div>
          ))}
        </div>,
        document.body
      )}
    </>
  );
};

export default Dropdown;
