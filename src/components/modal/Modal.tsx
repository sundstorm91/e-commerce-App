import { Portal } from '../portal/Portal';

interface IModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ onClose, children }: IModalProps) => {
  return (
    <Portal>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white p-6 rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          <button onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </Portal>
  );
};
