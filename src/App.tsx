import { type ReactElement } from 'react';
import { Header } from './components/app-header/Header';
import { Outlet, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { useUIstore } from './service/store/ui.store';
import { AuthModal } from './components/modal/auth-modal/AuthModal';
import { ProtectedRouteElement } from './components/auth/ProtectedRouteElement';
import { ProfilePage } from './pages/ProfilePage';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { WishlistPage } from './pages/WishListPage';
import { OrderPage } from './pages/OrderPage';
import { ErrorFallback } from './components/ui/ErrorBoundary/ErrorFallback';
import ErrorBoundary from './components/ui/ErrorBoundary/ErrorBoundary';

const App = () => {
  const { isAuthOpen, isCheckout } = useUIstore();

  const Layout = (): ReactElement => {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1">
          <Outlet />
        </main>

        {isAuthOpen && <AuthModal />}
        {isCheckout && <CheckoutModal />}
      </div>
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route
          path="/product/:id"
          element={
            <ErrorBoundary
              fallback={
                <ErrorFallback message="Ошибка загрузки страницы товара" />
              }
            >
              <ProductPage />
            </ErrorBoundary>
          }
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/orders" element={<OrderPage />} />
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
