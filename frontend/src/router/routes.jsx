import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Auth/Login';
import ItemsList from '../pages/ItemsList';
import Landing from '../pages/Landing';
import ItemForm from '../pages/ItemForm';
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
                path: 'items/new',
                element: <ItemForm />
            },
            {
                path: 'items/edit/:id',
                element: <ItemForm editMode />
            },
        ]
    },
    {
        path: '/login',
        element: <Login />,
    }
])