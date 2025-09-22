export const CheckoutSuccess = () => {
  const orderNumber = Math.random().toString(36).substr(2, 8).toUpperCase();
  return <div>Заказ № ${orderNumber} выполнен!</div>;
};
