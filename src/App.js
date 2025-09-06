import React, { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import NotFound from './pages/notfound/Notfound';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Donnees from './pages/donnees/Donnees';
import Abonnement from './pages/abonnement/Abonnement';
import DonneesType from './pages/donnees/donneesType/DonneesType';
import DonneesOne from './pages/donnees/donneesOne/DonneesOne';

const Home = lazy(() => import('./pages/home/Home'));
const Forage = lazy(() => import('./pages/forage/Forage'));
const Geochimie = lazy(() => import('./pages/geochimie/Geochimie'));
const Geologiques = lazy(() => import('./pages/geologiques/Geologiques'));
const Geophysique = lazy(() => import('./pages/geophysique/Geophysique'));
const Hydrogeologiques = lazy(() => import('./pages/hydrogeologiques/Hydrogeologiques'));
const Hydrologiques = lazy(() => import('./pages/hydrologiques/Hydrologiques'));
const Perochimie = lazy(() => import('./pages/perochimie/Perochimie'));
const Petrolier = lazy(() => import('./pages/petrolier/Petrolier'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/donnees', element: <Donnees /> },
      { path: '/forage', element: <Forage /> },
      { path: '/geochimie', element: <Geochimie /> },
      { path: '/geologiques', element: <Geologiques /> },
      { path: '/geophysique', element: <Geophysique /> },
      { path: '/hydrogeologiques', element: <Hydrogeologiques /> },
      { path: '/hydrologiques', element: <Hydrologiques /> },
      { path: '/perochimie', element: <Perochimie /> },
      { path: '/petrolier', element: <Petrolier /> },
      { path: '/abonnement', element: <Abonnement /> },
      { path: '/donnees_type', element: <DonneesType /> },
      { path: '/donnees_one', element: <DonneesOne /> },
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
      { path: '*', element: <NotFound /> }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}