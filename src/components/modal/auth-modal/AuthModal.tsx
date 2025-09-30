import { useUIstore } from '@/service/store/ui.store';
import { Modal } from '../Modal';
import type { IAuthModalData } from '@/types/data-types';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const AuthModal = () => {
  const { closeModal, modalData } = useUIstore();
  const authData = modalData as IAuthModalData;
  return (
    <Modal onClose={() => closeModal('auth')}>
      {authData.mode === 'login' ? <LoginForm /> : <RegisterForm />}
    </Modal>
  );
};
