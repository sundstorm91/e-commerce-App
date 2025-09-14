import { useEffect, useRef, useState } from 'react';
import type { ILang } from '../Header';
import ru from '../../../assets/svg/ru.svg';
import en from '../../../assets/svg/ca.svg';
import es from '../../../assets/svg/am.svg';

interface IDropDownProps {
  options: ILang[];
  selectedOption: ILang;
  onSelect: (option: ILang) => void;
}
export const DropdownListLanguage: React.FC<IDropDownProps> = ({
  onSelect,
  options,
  selectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropDownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target instanceof Node) {
        if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: ILang) => {
    onSelect(option);
    console.log(option.value);
    setIsOpen(false);
  };

  return (
    <div ref={dropDownRef} className="w-50 h-10">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center">
        <img src={selectedOption.value === 'RU' ? ru : en} alt="" />
        {selectedOption?.value || 'Выберите язык'}
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      {/* выпадающий список */}

      {isOpen && (
        <ul role="listbox">
          {options
            .filter((option) => option.value !== selectedOption.value)
            .map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className="cursor-pointer"
              >
                {option.value}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
