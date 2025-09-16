import { useState, type ReactElement } from 'react';
import { Header } from './components/app-header/Header';
import { Outlet, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage';

const App = () => {
  const Layout = (): ReactElement => {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
      </Route>
    </Routes>
  );
};

export default App;
