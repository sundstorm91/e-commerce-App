// pages/ProfilePage.tsx
export const ProfilePage = () => {
  const isEditing = false;
  // 1. Получить данные пользователя из useUserStore (currentUser, isAuth)
  // 2. Если пользователь не авторизован (редкий кейс, т.к. ProtectedRoute), показать заглушку
  // 3. Состояние для режима редактирования (isEditing: boolean)
  // 4. Состояния для полей формы (name, email, password)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Заголовок страницы */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Профиль</h1>

        {/* Карточка профиля */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* Режим просмотра (когда не редактируется) */}
          {!isEditing ? (
            <div className="space-y-4">
              {/* Аватар пользователя (инициалы или дефолтная картинка) */}
              {/* Поле "Имя": значение + иконка карандаша для редактирования */}
              {/* Поле "Email": значение */}
              {/* Кнопка "Редактировать" переключает в режим редактирования */}
              {/* Кнопка "Выйти" вызывает logout() */}
            </div>
          ) : (
            /* Режим редактирования */
            <form className="space-y-4">
              {/* Поле ввода имени */}
              {/* Поле ввода email */}
              {/* Поле для нового пароля (опционально) */}
              {/* Кнопки "Сохранить" и "Отмена" */}
            </form>
          )}
        </div>

        {/* Блок истории заказов (заглушка) */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">История заказов</h2>
          {/* Если заказов нет: сообщение "Заказов пока нет" */}
          {/* Если есть: список заказов с номером, датой, статусом */}
        </div>
      </div>
    </div>
  );
};
