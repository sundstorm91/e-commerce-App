import { NavLink } from 'react-router-dom';
import iconShop from '../../assets/svg/icons8-galaxy-store.svg';
import { Search } from '../search/Search';
import { DropdownList } from './language/Language';
import { useState } from 'react';
import ru from '../../assets/svg/ru.svg';
import en from '../../assets/svg/ca.svg';
import { useLanguageStore } from '@/service/store/language.store';

interface UILanguages {
  label: 'Русский' | 'English';
  value: 'RU' | 'EN';
}

const languages: UILanguages[] = [
  { label: 'Русский', value: 'RU' },
  { label: 'English', value: 'EN' },
];

/* Если не авторизован */

/* const notAuth = [

] */

export const Header = () => {
  const { currentLanguage, setLanguage } = useLanguageStore();

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
    </header>
  );
};
