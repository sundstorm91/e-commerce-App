import { useState } from 'react';
import { Modal } from './components/modal/Modal';
import { Spinner } from './components/spinner/spinner';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={openModal} className="border-2 bg-amber-400">
        Показать модалку
      </button>
      {isModalOpen ? <div>true!</div> : <div>false!</div>}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <div>Тут содержимое модалки</div>
          <div>
            <Spinner />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default App;
