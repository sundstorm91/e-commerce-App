// components/ProductCard.tsx
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react'; // Или любые другие иконки
import type { IProduct } from '@/types/data-types';

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  // Форматируем цену с рублями (можно адаптировать под другую валюту)
  const formattedPrice = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
  }).format(product.price);

  // Создаем массив звезд для рейтинга
  const fullStars = Math.floor(product.rating?.rate || 0);
  const hasHalfStar = (product.rating?.rate || 0) % 1 >= 0.5;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Кнопка "Избранное" (абсолютное позиционирование) */}
      <button
        className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-1.5 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 hover:!opacity-100 hover:bg-rose-50 hover:text-rose-500"
        aria-label="Добавить в избранное"
      >
        <Heart className="h-4 w-4" strokeWidth={2} />
      </button>

      {/* Обертка для картинки */}
      <Link to={`/product/${product.id}`} className="flex-shrink-0">
        <img
          src={product.image}
          alt={product.title}
          className="h-60 w-full object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy" // Ленивая загрузка для перфоманса
        />
      </Link>

      {/* Контент карточки */}
      <div className="flex flex-1 flex-col p-4">
        {/* Категория (необязательно) */}
        <span className="mb-1 text-xs font-medium uppercase text-gray-500">
          {product.category}
        </span>

        {/* Название товара */}
        <Link to={`/product/${product.id}`}>
          <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-900 hover:text-blue-600">
            {product.title}
          </h3>
        </Link>

        {/* Рейтинг и количество отзывов */}
        <div className="mb-3 flex items-center gap-1">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 fill-current ${i < fullStars ? 'text-amber-400' : hasHalfStar && i === fullStars ? 'text-amber-400' : 'text-gray-300'}`}
                strokeWidth={0} // Убираем обводку у заполненных звезд
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            ({product.rating?.count})
          </span>
        </div>

        {/* Описание (необязательно, можно скрыть) */}
        <p className="mb-4 line-clamp-2 text-xs text-gray-600 flex-1">
          {product.description}
        </p>

        {/* Цена и кнопка в корзину */}
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            {formattedPrice}
          </span>
          <button
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
            onClick={() => console.log('Add to cart', product.id)} // Заглушка для добавления в корзину
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
};
