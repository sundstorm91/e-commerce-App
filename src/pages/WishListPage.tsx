import { useTranslation } from '@/hooks/useTranslation';
import { useProductStore } from '@/service/store/product.store';
import { Link } from 'react-router-dom';

export const WishlistPage = () => {
  const { t } = useTranslation();
  const { wishlist, removeFromWishlist, clearWishlist } = useProductStore();

  // Группировка товаров по категориям
  const groupedByCategory = wishlist.reduce(
    (acc, product) => {
      const category = product.category || 'Без категории';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    },
    {} as Record<string, typeof wishlist>
  );

  // Сортировка категорий по алфавиту
  const sortedCategories = Object.keys(groupedByCategory).sort();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('favorites.noFav')}
          </h2>
          <p className="text-gray-600 mb-6">{t('favorites.firstFav')}</p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('favorites.startShop')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Заголовок и кнопка очистки */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t('favorites.fav')}
            </h1>
            <p className="text-gray-600 mt-2">
              {wishlist.length} {t('orders.product')}
              {wishlist.length % 10 === 1
                ? ''
                : wishlist.length % 10 >= 2 && wishlist.length % 10 <= 4
                  ? 'а'
                  : 'ов'}
            </p>
          </div>
          <button
            onClick={clearWishlist}
            className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
          >
            {t('orders.clearAll')}
          </button>
        </div>

        {/* Список по категориям */}
        <div className="space-y-8">
          {sortedCategories.map((category) => (
            <div
              key={category}
              className="bg-white rounded-lg shadow-sm border"
            >
              {/* Заголовок категории */}
              <div className="border-b p-6">
                <h2 className="text-xl font-semibold text-gray-900 capitalize">
                  {category}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  {groupedByCategory[category].length} {t('orders.product')}
                  {groupedByCategory[category].length % 10 === 1
                    ? ''
                    : groupedByCategory[category].length % 10 >= 2 &&
                        groupedByCategory[category].length % 10 <= 4
                      ? 'а'
                      : 'ов'}{' '}
                  {t('orders.inThisCategory')}
                </p>
              </div>

              {/* Товары категории */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groupedByCategory[category].map((product) => (
                    <div
                      key={product.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex space-x-4">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-20 h-20 object-contain flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 line-clamp-2">
                            {product.title}
                          </h3>
                          <p className="text-lg font-semibold text-blue-600 mt-2">
                            {product.price} ₽
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <Link
                              to={`/product/${product.id}`}
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              {t('orders.moreDetails')}
                            </Link>
                            <button
                              onClick={() => removeFromWishlist(product.id)}
                              className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                              title="Удалить из избранного"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Навигация */}
        <div className="flex justify-center mt-8 space-x-4">
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('orders.continueBuy')}
          </Link>
          <Link
            to="/cart"
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            {t('orders.goCart')}
          </Link>
        </div>
      </div>
    </div>
  );
};
