import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface IPortalProps {
  children: ReactNode;
}

export const Portal = ({ children }: IPortalProps) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const modalRoot = document.getElementById('modal-root');

    setContainer(modalRoot);
  }, []);

  if (!container) return null;

  // Используем React-портал для рендера в modal-root
  return createPortal(children, container);
};
