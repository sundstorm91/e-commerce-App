import { NavLink } from 'react-router-dom';
import iconShop from '../../assets/svg/icons8-galaxy-store.svg';
import { Search } from '../search/Search';
import { DropdownListLanguage } from './language/Language';
import { useEffect, useRef, useState } from 'react';
import { useUserStore } from '@/service/store/user.store';

export interface ILang {
  value: 'RU' | 'EN' | 'ES';
  label: 'Русский' | 'English' | 'Español';
}

const lang: ILang[] = [
  { label: 'Русский', value: 'RU' },
  { label: 'English', value: 'EN' },
];

export const Header = () => {
  const [selectLang, setSelectLang] = useState<ILang>({
    value: 'RU',
    label: 'Русский',
  });

  /* auth */
  /*  const { currentUser, isLoading, isAuth } = useUserStore();
  const [isProfileListOpen, setProfileListOpen] = useState(false);
  const profileDrowDownRef = useRef<HTMLDivElement | null>(null); */

  return (
    <header className="flex items-center border gap-10">
      <NavLink to="/">
        <img src={iconShop} alt="logo-shop" />
      </NavLink>

      <Search />

      <DropdownListLanguage
        onSelect={setSelectLang}
        options={lang}
        selectedOption={selectLang}
      />

      <div>
        <img src="" alt="" />
      </div>
    </header>
  );
};
