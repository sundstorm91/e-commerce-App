import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react'; // Или любые другие иконки
import type { IProduct } from '@/types/data-types';
import { useCartStore } from '@/service/store/cart.store';
import { useProductStore } from '@/service/store/product.store';
import { useTranslation } from '@/hooks/useTranslation';

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  /* перевод! */
  const { t, tProduct } = useTranslation();

  const { addItem } = useCartStore();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useProductStore();

  const handleWishList = () => {
    if (isWishlisted(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      category: product.category,
      description: product.description,
      rating: product.rating,
    });
  };

  // Создаем массив звезд для рейтинга
  const fullStars = Math.floor(product.rating?.rate || 0);
  const hasHalfStar = (product.rating?.rate || 0) % 1 >= 0.5;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <button
        className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-1.5 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 hover:!opacity-100 hover:bg-rose-50 hover:text-rose-500"
        aria-label="Добавить в избранное"
        onClick={handleWishList}
      >
        {isWishlisted(product.id) ? (
          <Heart className="h-5 w-5" strokeWidth={2} fill="#FA8072" />
        ) : (
          <Heart className="h-5 w-5" strokeWidth={2} />
        )}
      </button>

      <Link to={`/product/${product.id}`} className="flex-shrink-0">
        <img
          src={product.image}
          alt={product.title}
          className="h-60 w-full object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy" // Ленивая загрузка для перфоманса
        />
      </Link>

      <div className="flex  flex-1 flex-col p-4">
        <span className="mb-1 text-xs font-medium uppercase text-gray-500">
          {product.category}
        </span>

        <Link to={`/product/${product.id}`}>
          <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-900 hover:text-blue-600">
            {product.title}
          </h3>
        </Link>

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

        <p className="mb-4 line-clamp-2 text-xs text-gray-600 flex-1">
          {tProduct(product.id)}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            {product.price} ₽
          </span>
          <button
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
            onClick={handleAddToCart}
          >
            {t('common.addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
};
