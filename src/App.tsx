import { useState, type ReactElement } from 'react';
import { Header } from './components/app-header/Header';
import { Outlet, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { useUIstore } from './service/store/ui.store';
import { AuthModal } from './components/modal/auth-modal/AuthModal';
import { ProtectedRouteElement } from './components/auth/ProtectedRouteElement';
import { ProfilePage } from './pages/ProfilePage';

const App = () => {
  const { isAuthOpen } = useUIstore();

  const Layout = (): ReactElement => {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1">
          <Outlet />
        </main>

        {isAuthOpen && <AuthModal />}
      </div>
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />

        <Route
          path="/profile"
          element={
            <ProtectedRouteElement>
              <ProfilePage />
            </ProtectedRouteElement>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;

/* {
address: {
geolocation: {
lat: "-37.3159",
long: "81.1496"
},
city: "kilcoole",
street: "new road",
number: 7682,
zipcode: "12926-3874"
},
id: 1,
email: "john@gmail.com",
username: "johnd",
password: "m38rmF$",
name: {
firstname: "john",
lastname: "doe"
},
phone: "1-570-236-7033",
__v: 0
}, */
