import { useRef, useState } from 'react';

interface IDropDownProps<T> {
  options: T[];
  selectedOption: T | null;
  onSelect: (option: T) => void;
  renderTrigger: (isOpen: boolean) => React.ReactNode;
  renderItem: (item: T) => React.ReactNode;
  filterFn?: (item: T) => boolean;
  keyExtractor: (item: T) => string | number;
}

export const DropdownList = <T,>({
  onSelect,
  options,
  filterFn,
  keyExtractor,
  renderTrigger,
  renderItem,
}: IDropDownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentOptions = filterFn ? options.filter(filterFn) : options;
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={dropDownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>
        {renderTrigger(isOpen)}
      </button>

      {isOpen && (
        <ul>
          {currentOptions.map((item) => (
            <li key={keyExtractor(item)} onClick={() => onSelect(item)}>
              {renderItem(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
