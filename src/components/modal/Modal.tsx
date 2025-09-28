import { Portal } from '../portal/Portal';

interface IModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ onClose, children }: IModalProps) => {
  return (
    <Portal>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full justify-center">
          <div className="p-6 justify-center">{children}</div>
          <div className="border-t border-gray-100 p-4 flex justify-center">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};
