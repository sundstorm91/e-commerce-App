import type { IOrder } from '@/service/store/order.store';

interface IOrderProps {
  order: IOrder;
}

export const OrderCard: React.FC<IOrderProps> = ({ order }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 hover:shadow-md transition-shadow">
      {/* Заголовок заказа */}
      <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-100">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Заказ #{order.id}
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            {new Date(order.date).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-gray-900">
            ${order.total.toFixed(2)}
          </p>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
              order.status === 'completed'
                ? 'bg-green-100 text-green-800'
                : order.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
            }`}
          >
            {order.status === 'completed' && 'Завершен'}
            {order.status === 'pending' && 'В обработке'}
            {order.status === 'cancelled' && 'Отменен'}
          </span>
        </div>
      </div>

      {/* Список товаров */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-3">
          Товары ({order.items.length})
        </h4>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-contain bg-white rounded border flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 line-clamp-2">
                  {item.title}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  ${item.price} × {item.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 mt-1">Итого</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Кнопки действий */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
        <button className="px-4 py-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
          Повторить заказ
        </button>
        <button className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors">
          Подробнее
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
