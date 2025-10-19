import { useOrderStore } from '../service/store/order.store';
import { Link } from 'react-router-dom';
import { OrderCard } from './OrderCard';
import { useTranslation } from '@/hooks/useTranslation';

export const OrderPage = () => {
  const { t } = useTranslation();
  const { orders } = useOrderStore();

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('orders.noOrders')}
          </h2>
          <p className="text-gray-600 mb-6">{t('orders.firstBuy')}</p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('orders.startShop')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('user.myOrders')}
          </h1>
          <p className="text-gray-600 mt-2">
            {orders.length} {t('orders.order')}
            {orders.length % 10 === 1
              ? ''
              : orders.length % 10 >= 2 && orders.length % 10 <= 4
                ? 'а'
                : 'ов'}
          </p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>

        {/* Навигация */}
        <div className="flex justify-center mt-8">
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('orders.continueBuy')}
          </Link>
        </div>
      </div>
    </div>
  );
};
