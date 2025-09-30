import { useCartStore } from '@/service/store/cart.store';
import { useOrderStore } from '@/service/store/order.store';
import { useEffect, useState } from 'react';

export const CheckoutSuccess = () => {
  const { items } = useCartStore.getState();
  const orderNumber = useOrderStore.getState().addOrder(items);

  useCartStore.getState().clearCart();

  return (
    <div className="text-center p-8">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-8 h-8 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <div className="text-lg font-medium text-gray-900 mb-2">
        Заказ {orderNumber}выполнен!
      </div>
    </div>
  );
};
