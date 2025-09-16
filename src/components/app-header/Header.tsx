import { NavLink } from 'react-router-dom';
import iconShop from '../../assets/svg/icons8-galaxy-store.svg';
import { Search } from '../search/Search';
import { DropdownList } from './dropDownComponent/DropDownList';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ru from '../../assets/svg/ru.svg';
import en from '../../assets/svg/ca.svg';
import { useLanguageStore } from '@/service/store/language.store';
import { useUserStore } from '@/service/store/user.store';
import { useUIstore } from '@/service/store/ui.store';
import { UserIcon } from 'lucide-react';

/* switch languages */
interface UILanguages {
  label: 'Русский' | 'English';
  value: 'RU' | 'EN';
}

const languages: UILanguages[] = [
  { label: 'Русский', value: 'RU' },
  { label: 'English', value: 'EN' },
];

/* profile */

interface ProfileOption {
  label: string;
  value: 'login' | 'register' | 'logout' | 'profile' | 'orders' | 'wishlist';
}

const profileOptions = {
  unauthorized: [
    { label: 'Войти', value: 'login' } as ProfileOption,
    { label: 'Зарегистрироваться', value: 'register' } as ProfileOption,
  ],
  authorized: [
    { label: 'Мой профиль', value: 'profile' } as ProfileOption,
    { label: 'Мои заказы', value: 'orders' } as ProfileOption,
    { label: 'Избранное', value: 'wishlist' } as ProfileOption,
    { label: 'Выйти', value: 'logout' } as ProfileOption,
  ],
};

export const Header = () => {
  const { currentLanguage, setLanguage } = useLanguageStore();
  const { currentUser, isAuth, logout } = useUserStore();
  const { openModal } = useUIstore();
  const navigate = useNavigate();

  const selectedLanguages = languages.find(
    (lang) => lang.value === currentLanguage
  );

  const handleClickLanguages = (lang: UILanguages) => {
    setLanguage(lang.value);
  };

  return (
    <header className="flex items-center border gap-10">
      <NavLink to="/">
        <img src={iconShop} alt="logo-shop" />
      </NavLink>

      <Search />

      <DropdownList
        options={languages}
        selectedOption={selectedLanguages!}
        onSelect={handleClickLanguages}
        keyExtractor={(lang: UILanguages) => lang.value}
        filterFn={(lang: UILanguages) => lang.value !== currentLanguage}
        renderTrigger={(isOpen) => (
          <>
            <img src={currentLanguage === 'RU' ? ru : en} alt="" />
            {selectedLanguages?.label}
            <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
          </>
        )}
        renderItem={(lang: UILanguages) => (
          <div className="flex items-center">
            {/* <img src={selectLang.icon} alt={lang.label} /> */}
            {lang.label}
          </div>
        )}
      />

      <DropdownList
        options={
          isAuth ? profileOptions.authorized : profileOptions.unauthorized
        }
        selectedOption={null}
        onSelect={(option: ProfileOption) => {
          switch (option.value) {
            case 'login':
              openModal('auth', { mode: 'login' });
              break;
            case 'register':
              openModal('auth', { mode: 'register' });
              break;
            case 'logout':
              logout();
              break;
            case 'profile':
              navigate('/profile');
              break;
            case 'orders':
              navigate('/orders');
              break;
            case 'wishlist':
              navigate('/wishlist');
              break;
            default:
              console.warn('Unknown option:', option.value); // ✅ Защита от будущего
              break;
          }
        }}
        keyExtractor={(item) => item.value}
        renderItem={(item) => (
          <div className="flex items-center">
            {/* <img src={selectLang.icon} alt={lang.label} /> */}
            {item.label}
          </div>
        )}
        renderTrigger={(isOpen) =>
          isAuth ? (
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                {currentUser?.username[0]?.toUpperCase()}
              </div>
              <span
                className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
              >
                ▼
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 cursor-pointer">
              <UserIcon className="w-6 h-6" />
              <span
                className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
              >
                ▼
              </span>
            </div>
          )
        }
      />
    </header>
  );
};
