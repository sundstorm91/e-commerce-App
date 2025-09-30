import { Spinner } from '../spinner/spinner';

export const CheckoutProgress = () => {
  return (
    <div className="text-center p-8 max-w-sm mx-auto">
      <div className="text-xl font-semibold text-gray-900 mb-3">
        Обрабатываем заказ
      </div>
      <div className="flex justify-center">
        <Spinner />
      </div>
      <div className="text-gray-600 text-sm leading-relaxed">
        Пожалуйста, не закрывайте страницу.
        <br />
        Это займет не более 10 секунд.
      </div>
    </div>
  );
};
