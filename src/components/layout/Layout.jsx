import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';
import './layout.scss'
import ScrollToTop from '../scrollToTop/ScrollToTop';

const Layout = () => (
  <div className='app-rows'>
    <Navbar />
     <ScrollToTop /> 
    <div className="app-container">
      <Suspense fallback={<div className="loading">Chargement...</div>}>
        <Outlet />
      </Suspense>
    </div> 
    <Footer />
  </div>
);

export default Layout;
