import { useTranslation } from '@/hooks/useTranslation';
import { useUserStore } from '@/service/store/user.store';
import { ArrowRight, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const ProfilePage = () => {
  const { t } = useTranslation();
  const user = useUserStore((state) => state.currentUser);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Заголовок */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {t('header.profile')}
        </h1>

        {/* Карточка пользователя */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {t('header.personalData')}
          </h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600">{t('reg.name')}</label>
              <p className="font-medium">{user?.username}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <p className="font-medium">{user?.password}</p> {/* ?????? */}
            </div>
            {/* Можно добавить больше полей */}
          </div>
        </div>

        {/* Навигация */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">
            {t('header.mySections')}
          </h2>
          <div className="space-y-3">
            <NavLink
              to="/orders"
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span>📦 {t('user.myOrders')}</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </NavLink>

            <NavLink
              to="/wishlist"
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span>❤️ {t('user.myFav')}</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </NavLink>

            {/* <NavLink
              to="/settings"
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span>⚙️ {t('user.settings')}</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </NavLink> */}

            {/* Дополнительные ссылки */}

            {/* <button className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg transition-colors text-left">
              <span>📞 {t('user.mySupport')}</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </button> */}

            <button className="flex items-center justify-between w-full p-3 hover:bg-red-50 rounded-lg transition-colors text-left text-red-600">
              <span>🚪 {t('user.exit')}</span>
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
