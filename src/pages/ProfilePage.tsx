import { useUserStore } from '@/service/store/user.store';
import { ArrowRight, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const ProfilePage = () => {
  const user = useUserStore((state) => state.currentUser);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Заголовок */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Профиль</h1>

        {/* Карточка пользователя */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Личные данные</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600">Имя</label>
              <p className="font-medium">{user?.username}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <p className="font-medium">{user?.email}</p>
            </div>
            {/* Можно добавить больше полей */}
          </div>
        </div>

        {/* Навигация */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Мои разделы</h2>
          <div className="space-y-3">
            <NavLink
              to="/orders"
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span>📦 Мои заказы</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </NavLink>

            <NavLink
              to="/wishlist"
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span>❤️ Избранное</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </NavLink>

            <NavLink
              to="/settings"
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span>⚙️ Настройки</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </NavLink>

            {/* Дополнительные ссылки */}
            <button className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg transition-colors text-left">
              <span>📞 Поддержка</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </button>

            <button className="flex items-center justify-between w-full p-3 hover:bg-red-50 rounded-lg transition-colors text-left text-red-600">
              <span>🚪 Выйти</span>
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
