import { useEffect, useRef, useState } from 'react';

interface IDropDownProps<T> {
  options: T[] /* массив всего */;
  selectedOption: T /* конкретно выбраный */;
  onSelect: (option: T) => void /* коллбэк */;
  renderTrigger: (isOpen: boolean) => React.ReactNode;
  renderItem: (item: T) => React.ReactNode;
  filterFn?: (item: T) => boolean;
  keyExtractor: (item: T) => string | number;
}

export const DropdownList = <T,>({
  onSelect,
  options,
  selectedOption,
  filterFn,
  keyExtractor,
  renderTrigger, // ✅ isOpen уже типизирован в интерфейсе
  renderItem,
}: IDropDownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentOptions = filterFn ? options.filter(filterFn) : options;
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={dropDownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>
        {renderTrigger(isOpen)} {/* ✅ isOpen: boolean */}
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
