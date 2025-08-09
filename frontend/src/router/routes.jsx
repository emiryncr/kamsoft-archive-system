import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import ItemsList from '../pages/ItemsList';
import Landing from '../pages/Landing';
import ItemForm from '../pages/ItemForm';
import ProtectedRoute from './ProtectedRoute';
import UserManagement from '../pages/UserManagement';
import ArchiveManagement from '../pages/ArchiveManagement';
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
            {
                path: 'user-management',
                element: (
                    <ProtectedRoute allowedRoles={['admin']}>
                        <UserManagement />
                    </ProtectedRoute>
                )
            },
            {
                path: 'archive-management',
                element: (
                    <ProtectedRoute allowedRoles={['admin']}>
                        <ArchiveManagement />
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