import React from 'react';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import NewsletterPopup from './common/NewsletterPopup';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <NewsletterPopup />
    </div>
  );
};

export default Layout;
