'use client';

import { useEffect, useRef, useState } from 'react';
import Dropdown from '../dropdown/Dropdown';
import useDropdownStore from '../dropdown/useDropdownStore';
import { escapeRegExp } from 'lodash';

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
    interface ConsonantToSyllable {
      [key: string]: number;
    }

    const hangulFiltering = (ch: string): string => {
      const offset = 44032;
      if (/[가-힣]/.test(ch)) {
        const chCode = ch.charCodeAt(0) - offset;
        if (chCode % 28 > 0) {
          return ch;
        }
        const begin = Math.floor(chCode / 28) * 28 + offset;
        const end = begin + 27;
        return `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
      }
      if (/[ㄱ-ㅎ]/.test(ch)) {
        const con2syl: ConsonantToSyllable = {
          ㄱ: '가'.charCodeAt(0),
          ㄲ: '까'.charCodeAt(0),
          ㄴ: '나'.charCodeAt(0),
          ㄷ: '다'.charCodeAt(0),
          ㄸ: '따'.charCodeAt(0),
          ㄹ: '라'.charCodeAt(0),
          ㅁ: '마'.charCodeAt(0),
          ㅂ: '바'.charCodeAt(0),
          ㅃ: '빠'.charCodeAt(0),
          ㅅ: '사'.charCodeAt(0),
        };
        const begin =
          con2syl[ch] || (ch.charCodeAt(0) - 12613) * 588 + con2syl['ㅅ'];
        const end = begin + 587;
        return `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
      }
      return escapeRegExp(ch);
    };

    const handleFilter = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target?.value.length > 0) {
        openDropdown(dropdownId.current);

        const filterItems = (items: string[], value: string) => {
          const pattern = Array.from(value).map(hangulFiltering).join('');
          const regExp = new RegExp(pattern, 'i');
          return items.filter((item) => regExp.test(item));
        };

        setFilteredData(filterItems(data, target.value));
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
