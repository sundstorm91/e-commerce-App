import { useState } from 'react';

export const Search = () => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('поиск товара отработает!');
    /* делаем запрос! */
  };

  return (
    <form className="flex gap-2 m-2">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        className="px-4 py-2 border border-gray-300 rounded-md focus: focus: ring-blue-200 focus:ring-opacity-50 shadow-sm"
        placeholder="Введите товар..."
      />
      <button onClick={handleSubmit} disabled={!query}>
        <SearchIcon />
      </button>
    </form>
  );
};

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
