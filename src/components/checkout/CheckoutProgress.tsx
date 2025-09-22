import { Spinner } from '../spinner/spinner';

export const CheckoutProgress = () => {
  return (
    <>
      <div>Выполняем ваш заказ...</div>
      <div>
        <Spinner />
      </div>
    </>
  );
};
