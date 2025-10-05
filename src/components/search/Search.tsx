import type { IProduct } from '@/types/data-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ISearchInputProps {
  products: IProduct[];
}

export const Search: React.FC<ISearchInputProps> = ({ products }) => {
  const [inputProduct, setInputProduct] = useState('');
  const navigate = useNavigate();

  const filteredProducts = products
    ?.filter(
      (itemProduct) =>
        itemProduct.title.toLowerCase().includes(inputProduct.toLowerCase()) ||
        []
    )
    .slice(0, 5);

  return (
    <div className="relative">
      <input
        value={inputProduct}
        onChange={(e) => setInputProduct(e.target.value)}
        placeholder="Введите товар..."
        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-200 focus:ring-opacity-50 shadow-sm"
      />

      {/* DropDown */}
      {products && filteredProducts?.length > 0 && inputProduct && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 shadow-lg z-10">
          {filteredProducts?.map((item) => (
            <div
              key={item.id}
              className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => {
                navigate(`/product/${item.id}`);
                setInputProduct('');
              }}
            >
              <img src={item.image} alt={item.title} className="w-8 h-8 mr-2" />
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
