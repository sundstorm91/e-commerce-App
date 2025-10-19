// pages/CartPage.tsx
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '../service/store/cart.store';
import { useUIstore } from '../service/store/ui.store';
import { useUserStore } from '@/service/store/user.store';
import { useTranslation } from '@/hooks/useTranslation';

export const CartPage = () => {
  const { t } = useTranslation();

  const {
    items: cartItems,
    removeItem,
    total,
    updateQuantity,
  } = useCartStore();
  const { openModal } = useUIstore();
  const { isAuth } = useUserStore();

  // Если корзина пустая!
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('cart.cartEmpty')}
          </h2>
          <p className="text-gray-600 mb-8">{t('cart.addProduct')}</p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('cart.continueShopping')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Корзина</h1>
          <p className="text-gray-600 mt-2">
            {cartItems.length} {t('cart.goodsworth')} {total()} ₽
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основной блок с товарами */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex gap-6">
                  {/* Изображение товара */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-contain bg-gray-100 rounded-lg"
                  />

                  {/* Информация о товаре */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 mb-4">
                      {item.price} ₽
                    </p>

                    {/* Управление количеством */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => {
                            updateQuantity(item.id, item.quantity - 1);
                          }}
                          className="px-3 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-1 font-medium w-12 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            updateQuantity(item.id, item.quantity + 1);
                          }}
                          className="px-3 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Кнопка удаления */}
                      <button
                        onClick={() => {
                          removeItem(item.id);
                        }}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Блок итогов */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {t('cart.cartSummary')}
              </h2>

              <div className="space-y-4 mb-6" data-testId="cart-count">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {t('cart.products')} ({cartItems.length})
                  </span>
                  <span className="font-medium">{total()} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('cart.delivery')}</span>
                  <span className="font-medium">{t('cart.free')}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-4 border-t">
                  <span>{t('common.total')}</span>
                  <span>{total()} ₽</span>
                </div>
              </div>

              {/* Промокод (опционально) */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder={t('cart.promo')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Кнопка оформления */}
              <button
                onClick={() => {
                  // Если пользователь не авторизован: openModal('auth')
                  // Если авторизован: переход на страницу оформления

                  if (!isAuth) {
                    openModal('auth', { mode: 'login' });
                  } else {
                    openModal('checkout');
                  }
                }}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                {t('cart.orderinit')}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
