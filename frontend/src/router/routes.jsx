import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import ItemsList from '../pages/ItemsList';
import Landing from '../pages/Landing';
import ItemForm from '../pages/ItemForm';
import ProtectedRoute from './ProtectedRoute';
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Dashboard />,
        children: [
            {
                index: true,
                element: <Landing />
            },
            {
                path: 'archives',
                element: <ItemsList />
            },
            {
                path: 'archives/new',
                element: (
                    <ProtectedRoute allowedRoles={['admin', 'archiver']}>
                        <ItemForm />
                    </ProtectedRoute>
                )
            },
            {
                path: 'archives/edit/:id',
                element: (
                    <ProtectedRoute allowedRoles={['admin', 'archiver']}>
                        <ItemForm editMode />
                    </ProtectedRoute>
                )
            },
        ]
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Signup />
    }

])