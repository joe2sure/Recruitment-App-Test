import Login from '@/Auth/Login';
import Register from '@/Auth/Register';
import AuthLayout from '@/layout/authlayout';
import PublicLayout from '@/layout/PublicLayout';
import AboutPage from '@/pages/AboutPage';
import HomePage from '@/pages/HomePage';
import { createBrowserRouter } from 'react-router-dom';
import TrainingPage from '../pages/TrainingPage';
import CandidateRoutes from './candidateRoutes';
import EmployerRoutes from './employerRoutes';
import AdminRoutes from "./adminRoutes";

export const Routes = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      }
    ],
  },
  CandidateRoutes,
  EmployerRoutes,
  AdminRoutes
]);
