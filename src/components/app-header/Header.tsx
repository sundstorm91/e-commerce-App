import { NavLink } from 'react-router-dom';
import iconShop from '../../assets/svg/icons8-galaxy-store.svg';
import { Search } from '../search/Search';

export const Header = () => {
  return (
    <header className="flex items-center border gap-10">
      <NavLink to="/">
        <img src={iconShop} alt="logo-shop" />
      </NavLink>

      <Search />
    </header>
  );
};
