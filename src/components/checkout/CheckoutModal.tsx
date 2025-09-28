import { useEffect, useState } from 'react';
import { CheckoutProgress } from './CheckoutProgress';
import { CheckoutSuccess } from './CheckoutSuccess';
import { Modal } from '../modal/Modal';
import { useUIstore } from '@/service/store/ui.store';

export type TStatus = 'pending' | 'success' | 'error';

export const CheckoutModal = () => {
  const [status, setStatus] = useState<TStatus>('pending');
  const [timeLeft, setTimeLeft] = useState(15);
  const { closeModal } = useUIstore();

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
  return (
    <>
      <Modal onClose={() => closeModal('checkout')}>
        {status === 'pending' ? <CheckoutProgress /> : <CheckoutSuccess />}
      </Modal>
    </>
  );
};
