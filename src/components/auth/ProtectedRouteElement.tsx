import { useUserStore } from '@/service/store/user.store';
import { Navigate, useLocation } from 'react-router-dom';
import { useUIstore } from '@/service/store/ui.store';

interface ProtectedRouteProps {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
}

interface OnlyUnAuthProps {
  component: React.ReactElement;
}

export const ProtectedRouteElement: React.FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  children,
}) => {
  const { isAuth } = useUserStore();
  const { openModal } = useUIstore();

  if (!onlyUnAuth && !isAuth) {
    /* защищеный маршрут и неавторизованный пользователь */
    openModal('auth', { mode: 'login' });
    return <Navigate to="/" replace />;
  }

  if (onlyUnAuth && isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
};
