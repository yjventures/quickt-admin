import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Dashboard from '../layout/Dashboard';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import TotalRevenue from '../pages/TotalRevenue/TotalRevenue';
import PrivateRoute from './PrivateRoute';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Country from '../pages/Country/Country';
import Senders from '../pages/Senders/Senders';
import GeneralSettings from '../pages/GenSettings/GeneralSettings';
import Receivers from '../pages/Receivers/Receivers';
// import ProtectedRoute from './ProtectedRoute';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/dashboard',
        // element: <PrivateRoute> <Dashboard /> </PrivateRoute>,
        element: <Dashboard />,
        children: [
            {
                path: 'generalSettings',
                element: <GeneralSettings />,
                errorElement: <ErrorPage />,
            },
            {
                path: 'dashboard',
                element: <DashboardPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: 'countries',
                element: <Country />,
                errorElement: <ErrorPage />,
            },
            {
                path: 'senders',
                element: <Senders />,
                errorElement: <ErrorPage />,
            },
            {
                path: 'receivers',
                element: <Receivers />,
                errorElement: <ErrorPage />,
            },
            {
                path: 'revenue',
                element: <TotalRevenue />,
                errorElement: <ErrorPage />,
            },
        ],
    },
    {
        path: '*',
        element: <div>Page not found</div>,
    }
]);

export default routes;
