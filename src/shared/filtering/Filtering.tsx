'use client';

import { useEffect, useRef, useState } from 'react';
import Dropdown from '../dropdown/Dropdown';
import useDropdownStore from '../dropdown/useDropdownStore';

interface FilteringProps {
  data: string[];
  parentRef: React.RefObject<HTMLElement>;
  filterId: string;
  setSelectedFilteringData: (id: string, value: string) => void;
}

const Filtering = ({
  data,
  parentRef,
  filterId,
  setSelectedFilteringData,
}: FilteringProps) => {
  const [filteredData, setFilteredData] = useState(data);
  const dropdownId = useRef(`filterDropdown${Math.random()}`);
  const { dropdowns, openDropdown, closeDropdown } = useDropdownStore();

  useEffect(() => {
    console.log(dropdowns[dropdownId.current]?.selectedOption);
  }, [dropdowns, dropdownId]);

  useEffect(() => {
    const handleFilter = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target?.value.length > 0) {
        openDropdown(dropdownId.current);
        setFilteredData(
          data?.filter((item: string) => item.includes(target.value))
        );
      } else {
        closeDropdown(dropdownId.current);
        setFilteredData(data);
      }
    };
    const parentElement = parentRef.current;
    parentElement?.addEventListener('input', handleFilter);

    return () => {
      parentElement?.removeEventListener('input', handleFilter);
    };
  }, [
    data,
    dropdowns,
    filterId,
    parentRef,
    setSelectedFilteringData,
    openDropdown,
    closeDropdown,
  ]);

  const onClose = () => {
    closeDropdown(dropdownId.current);
  };

  const onClick = () => {
    setSelectedFilteringData(
      filterId,
      dropdowns[dropdownId.current]?.selectedOption || ''
    );
  };

  return (
    <div>
      {dropdowns[dropdownId.current]?.isVisible && (
        <div onClick={onClick}>
          <Dropdown
            options={filteredData}
            parentRef={parentRef}
            dropdownId={dropdownId.current}
            onClose={onClose}
          />
        </div>
      )}
    </div>
  );
};

export default Filtering;
