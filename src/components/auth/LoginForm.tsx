import { useEffect, useState } from 'react';
import { useUIstore } from '../../service/store/ui.store';
import { useUserStore } from '../../service/store/user.store';
import { useTranslation } from '@/hooks/useTranslation';
import { useForm } from 'react-hook-form';

interface LoginFormData {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
  } = useForm<LoginFormData>({
    mode: 'onChange', // Валидация при изменении
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const [isTyping, setIsTyping] = useState(false);

  const { closeModal, openModal } = useUIstore();
  const { login } = useUserStore();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      await login({
        username: data.username,
        password: data.password,
      });
      closeModal('auth');
    } catch (error) {
      console.error('Login failed:', error);
      setError('root', {
        type: 'manual',
        message: 'Ошибка входа. Проверьте логин и пароль.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  /* useEffect(() => {
    setValue('username', 'johnd');
    setValue('password', 'm38rmF$');
  }, [setValue]);  */

  useEffect(() => {
    const typeText = async (field: 'username' | 'password', text: string) => {
      setIsTyping(true);

      for (let i = 0; i <= text.length; i++) {
        setValue(field, text.slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      setIsTyping(false);
    };

    const autoFill = async () => {
      await typeText('username', 'johnd');
      await new Promise((resolve) => setTimeout(resolve, 200));
      await typeText('password', 'm38rmF$');
    };

    autoFill();
  }, [setValue]);

  return (
    <div className="w-96 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {t('header.auth')}
      </h2>

      {/* Общая ошибка формы */}
      {errors.root && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{errors.root.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Имя пользователя
          </label>
          <input
            {...register('username', {
              required: 'Имя пользователя обязательно',
            })}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.username ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('header.pass')}
          </label>
          <input
            type="password"
            {...register('password', {
              required: 'Пароль обязателен',
            })}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? t('header.loggingIn') : t('header.login')}
        </button>
      </form>

      <div className="mt-4 text-center">
        <span className="text-gray-600">{t('header.noAccount')} </span>
        <button
          onClick={() => openModal('auth', { mode: 'register' })}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {t('header.signup')}
        </button>
      </div>
    </div>
  );
};
