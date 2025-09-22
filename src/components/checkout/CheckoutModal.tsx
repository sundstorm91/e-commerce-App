import { useEffect, useState } from 'react';
import { CheckoutProgress } from './CheckoutProgress';
import { CheckoutSuccess } from './CheckoutSuccess';

export type TStatus = 'pending' | 'success' | 'error';

export const CheckoutModal = () => {
  const [status, setStatus] = useState<TStatus>('pending');
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          setStatus('success');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  if (status === 'pending') {
    return <CheckoutProgress />;
  }

  if (status === 'success') {
    return <CheckoutSuccess />;
  }
};
