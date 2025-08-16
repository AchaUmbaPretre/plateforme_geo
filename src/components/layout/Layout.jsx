import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';

const Layout = () => (
  <div className='app-rows'>
    <Navbar />
    <div className="app-container">
      <Suspense fallback={<div className="loading">Chargement...</div>}>
        <Outlet />
      </Suspense>
    </div> 
    <Footer />
  </div>
);

export default Layout;
