import { useState, type ReactElement } from 'react';
import { Header } from './components/app-header/Header';
import { Outlet, Route, Routes } from 'react-router-dom';

const App = () => {
  const Layout = (): ReactElement => {
    return (
      <>
        <Header />
        <main>
          <Outlet />
        </main>
      </>
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />} />
    </Routes>
  );
};

export default App;
