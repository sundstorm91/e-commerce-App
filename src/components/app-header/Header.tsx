import { NavLink } from 'react-router-dom';
import iconShop from '../../assets/svg/icons8-galaxy-store.svg';
import { Search } from '../search/Search';
import { DropdownListLanguage } from './language/language';
import { useState } from 'react';

export interface ILang {
  value: 'ru' | 'en' | 'es';
  label: 'Русский' | 'English' | 'Español';
}

const lang: ILang[] = [
  { label: 'Русский', value: 'ru' },
  { label: 'English', value: 'en' },
  { label: 'Español', value: 'es' },
];

export const Header = () => {
  const [selectLang, setSelectLang] = useState<ILang>({
    value: 'ru',
    label: 'Русский',
  });

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
    </header>
  );
};
