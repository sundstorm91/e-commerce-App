import { useRef, useState } from 'react';

interface IDropDownProps<T> {
  onToggle?: () => void;
  isOpen?: boolean;

  options: T[];
  selectedOption: T | null;
  onSelect: (option: T) => void;
  renderTrigger: (isOpen: boolean) => React.ReactNode;
  renderItem: (item: T) => React.ReactNode;
  filterFn?: (item: T) => boolean;
  keyExtractor: (item: T) => string | number;
}

export const DropdownList = <T,>({
  onToggle,
  isOpen,
  onSelect,
  options,
  filterFn,
  keyExtractor,
  renderTrigger,
  renderItem,
}: IDropDownProps<T>) => {
  const currentOptions = filterFn ? options.filter(filterFn) : options;

  return (
    <div className="relative">
      <button onClick={onToggle}>{renderTrigger(isOpen!)}</button>

      {isOpen && (
        <ul className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-xl z-50 min-w-full overflow-hidden py-1">
          {currentOptions.map((item) => (
            <li
              key={keyExtractor(item)}
              onClick={() => onSelect(item)}
              className="px-4 py-2.5 cursor-pointer transition-all duration-200 hover:bg-orange-50 hover:text-orange-600 active:bg-orange-100 border-l-2 border-transparent hover:border-orange-500"
            >
              {renderItem(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
