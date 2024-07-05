import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Dashboard from '../layout/Dashboard';
import TotalRevenue from '../pages/TotalRevenue/TotalRevenue';
import PrivateRoute from './PrivateRoute';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Country from '../pages/Country/Country';
import Senders from '../pages/Senders/Senders';
import GeneralSettings from '../pages/GenSettings/GeneralSettings';
import Receivers from '../pages/Receivers/Receivers';
import Partners from '../pages/Partners/Partners';
import Transaction from '../pages/Transactions/Transaction';
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
        element: <PrivateRoute> <Dashboard /> </PrivateRoute>,
        children: [
            {
                path: 'generalSettings',
                element: <GeneralSettings />,
                errorElement: <ErrorPage />,
            },
            {
                path: 'partners',
                element: <Partners />,
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
            {
                path: 'transactions',
                element: <Transaction />,
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
