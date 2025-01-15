'use client';

import Dropdown from '@/shared/dropdown/Dropdown';
import useDropdownStore from '@/shared/dropdown/useDropdownStore';
import { useRef } from 'react';

const Test = () => {
  const { dropdowns, openDropdown, closeDropdown } = useDropdownStore();
  const dropdownId = useRef('test');
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClose = () => {
    closeDropdown(dropdownId.current);
  };
  const handleDropdownClick = () => {
    if (dropdowns[dropdownId.current]?.isVisible) {
      closeDropdown(dropdownId.current);
    } else {
      openDropdown(dropdownId.current);
    }
  };

  return (
    <div>
      <h1>Test</h1>
      <button onClick={handleDropdownClick} ref={buttonRef}>
        Open Dropdown
      </button>
      {dropdowns[dropdownId.current]?.isVisible && (
        <Dropdown
          options={['Option 1', 'Option 2']}
          dropdownId={dropdownId.current}
          parentRef={buttonRef}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default Test;
