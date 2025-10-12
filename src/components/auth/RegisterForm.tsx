// components/auth/RegisterForm.tsx
import { useState } from 'react';
import { useUIstore } from '../../service/store/ui.store';
import { useUserStore } from '../../service/store/user.store';
import { useTranslation } from '@/hooks/useTranslation';
import { useForm } from 'react-hook-form';
import {
  registrationSchema,
  type RegisterFormData,
} from '@/schemas/auth-schemas';

export const RegisterForm = () => {
  const { t } = useTranslation();
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError, // ✅ Добавил setError для ручной установки ошибок
  } = useForm<RegisterFormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const { closeModal, openModal } = useUIstore();
  const { register } = useUserStore();

  const onSubmit = async (data: {
    username: string;
    email: string;
    password: string;
  }) => {
    const validationResult = registrationSchema.safeParse(data);

    if (!validationResult.success) {
      // ✅ Вместо alert - устанавливаем ошибки в соответствующие поля
      validationResult.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof RegisterFormData;
        setError(fieldName, {
          type: 'manual',
          message: issue.message,
        });
      });
      return;
    }

    setIsLoading(true);

    try {
      await register(data.username, data.email, data.password);
      closeModal('auth');
    } catch (error) {
      console.error('Registration failed:', error);
      // ✅ Ошибку API тоже показываем в UI
      setError('root', {
        type: 'manual',
        message: 'Ошибка регистрации. Попробуйте еще раз.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-96 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {t('header.signup')}
      </h2>

      {/* ✅ Общая ошибка формы */}
      {errors.root && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{errors.root.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('header.username')}
          </label>
          <input
            {...registerForm('username')}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.username ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
          {/* ✅ Ошибка под инпутом */}
          {errors.username && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <span>⚠️</span>
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            {...registerForm('email')}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <span>⚠️</span>
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('header.pass')}
          </label>
          <input
            type="password"
            {...registerForm('password')}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <span>⚠️</span>
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || isSubmitting}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          {isLoading || isSubmitting
            ? t('header.registring')
            : t('header.signup')}
        </button>
      </form>

      <div className="mt-4 text-center">
        <span className="text-gray-600"> {t('header.haveAccount')} </span>
        <button
          onClick={() => openModal('auth', { mode: 'login' })}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {t('header.login')}
        </button>
      </div>
    </div>
  );
};
