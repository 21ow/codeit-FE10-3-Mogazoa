import styles from './Dropdown.module.css';
import useDropdownStore from './useDropdown';

interface DropdownProps {
  options: string[];
  dropdownId: string;
}

const Drowndown = ({ options, dropdownId }: DropdownProps) => {
  const { dropdowns } = useDropdownStore();

  const onClick = (value: string) => {
    dropdowns[dropdownId].selectedOption = value;
  };

  return (
    <div className={styles.dropdown}>
      {options.map((option, index) => (
        <div
          className={styles.item}
          key={index}
          onClick={() => onClick(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default Drowndown;
