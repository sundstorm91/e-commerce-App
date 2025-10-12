import { NavLink } from 'react-router-dom';
import iconShop from '../../assets/svg/icons8-galaxy-store.svg';
import { Search } from '../search/Search';
import { DropdownList } from './dropDownComponent/DropDownList';
import { useNavigate } from 'react-router-dom';
import ru from '../../assets/svg/ru.svg';
import en from '../../assets/svg/ca.svg';
import { useLanguageStore } from '@/service/store/language.store';
import { useUserStore } from '@/service/store/user.store';
import { useUIstore } from '@/service/store/ui.store';
import { UserIcon, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/service/store/cart.store';
import { useQuery } from '@tanstack/react-query';
import { ProductsService } from '@/service/api/products';
import { useTranslation } from '@/hooks/useTranslation';
import { useState } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';

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

export const Header = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isPersonalDropDownOpen, setIsPersonalDropDownOpen] = useState(false);

  const { t } = useTranslation();
  const profileOptions = {
    unauthorized: [
      { label: 'Войти', value: 'login' } as ProfileOption,
      { label: 'Зарегистрироваться', value: 'register' } as ProfileOption,
    ],
    authorized: [
      { label: t('header.myProfile'), value: 'profile' } as ProfileOption,
      { label: t('header.myOrders'), value: 'orders' } as ProfileOption,
      { label: t('header.favorites'), value: 'wishlist' } as ProfileOption,
      { label: t('header.exit'), value: 'logout' } as ProfileOption,
    ],
  };

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => ProductsService.getAll(),
  });

  const { currentLanguage, setLanguage } = useLanguageStore();
  const { currentUser, isAuth, logout } = useUserStore();
  const { openModal } = useUIstore();
  const navigate = useNavigate();

  /* ! */
  const { items } = useCartStore();
  const selectedLanguages = languages.find(
    (lang) => lang.value === currentLanguage
  );

  const handleClickLanguages = (lang: UILanguages) => {
    setLanguage(lang.value);
    setIsDropDownOpen(false);
  };

  const languageRef = useOutsideClick(() => setIsDropDownOpen(false));
  const personalDataRef = useOutsideClick(() =>
    setIsPersonalDropDownOpen(false)
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto gap-4 flex h-16 items-center justify-evenly px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center space-x-2">
          <img src={iconShop} alt="logo-shop" className="h-8 w-8" />
          <span className="hidden font-bold text-xl sm:inline-block">
            FakeStore
          </span>
        </NavLink>

        <div className="relative max-w-lg mx-6">
          <Search products={products!} />
        </div>

        <div
          className="flex items-center justify-end space-x-4"
          ref={languageRef}
        >
          <DropdownList
            isOpen={isDropDownOpen}
            onToggle={() => setIsDropDownOpen(!isDropDownOpen)}
            options={languages}
            selectedOption={selectedLanguages!}
            onSelect={handleClickLanguages}
            keyExtractor={(lang: UILanguages) => lang.value}
            filterFn={(lang: UILanguages) => lang.value !== currentLanguage}
            renderTrigger={(isOpen) => (
              <div className="flex items-center cursor-pointer rounded-md p-2 hover:bg-gray-100 transition-colors">
                <img
                  src={currentLanguage === 'RU' ? ru : en}
                  alt={currentLanguage}
                  className="h-5 w-5 rounded-sm object-cover mr-2"
                />
                <span className="text-sm font-medium hidden sm:block">
                  {selectedLanguages?.label}
                </span>
                <span
                  className={`ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                >
                  ▼
                </span>
              </div>
            )}
            renderItem={(lang: UILanguages) => (
              <div className="flex items-center px-4 py-2 text-sm">
                <img
                  src={lang.value === 'RU' ? ru : en}
                  alt={lang.label}
                  className="h-4 w-4 rounded-sm object-cover mr-3"
                />
                {lang.label}
              </div>
            )}
          />
        </div>
        <div className="h-6 w-px bg-gray-300"></div>

        <div ref={personalDataRef}>
          <DropdownList
            isOpen={isPersonalDropDownOpen}
            onToggle={() => setIsPersonalDropDownOpen(!isPersonalDropDownOpen)}
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
                <div className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {currentUser?.username[0]?.toUpperCase()}
                  </div>
                  <span
                    className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  >
                    ▼
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-100 transition-colors">
                  <UserIcon className="w-6 h-6 text-gray-600" />
                  <span
                    className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  >
                    ▼
                  </span>
                </div>
              )
            }
          />
        </div>

        <NavLink
          to="/cart"
          className="relative rounded-2xl p-2 mb-2 hover:bg-blue-50 transition-all duration-200 group"
        >
          {items.length > 0 && (
            <div className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-medium ring-2 ring-white">
              {items.length}
            </div>
          )}
          <ShoppingCart className="h-7 w-7 text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-200" />
        </NavLink>
      </div>
    </header>
  );
};

/* const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef &&
        !dropdownRef.current?.contains(event?.target as Node)
      ) {
        console.log('АГА');

        setIsDropDownOpen(false);
      }
    }; */
