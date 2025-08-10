import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import api from '../services/api';

const ItemsList = () => {
    const [items, setItems] = useState([]);
    const { user } = useAuth();
    
    useEffect(() => {
        api.get('/items')
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error("Error fetching items:", error);
            });
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await api.delete(`/items/${id}`);
                setItems(items.filter(item => item._id !== id));
                alert('Item deleted successfully!');

                const updatedItems = await api.get('/items');
                setItems(updatedItems.data);
            } catch (error) {
                console.error("Error deleting item:", error);
                alert('Failed to delete item. Please try again.');
            }
        }
    };

    const canEditDelete = (item) => {
        if (!user) return false;
        if (user.role === 'admin') return true;
        if (user.role === 'archiver' && item.createdBy && item.createdBy._id === user.id) return true;
        return false;
    };

    const isMyItem = (item) => {
        return user && item.createdBy && item.createdBy._id === user.id;
    }

    return (
        <>
            <h2 className="text-2xl font-bold m-4">Archives</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {items.map(item => (
                    <div key={item.id} className="border border-zinc-300 bg-zinc-100 rounded p-4 shadow-xl relative">
                        {isMyItem(item) && (
                            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                Added By You
                            </div>
                        )}
                        <img src={item.image} alt={item.name} className="w-full h-32 object-cover mb-2" />
                        <h2 className="text-xl font-bold">{item.title}</h2>
                        <p className="text-gray-600 mb-2 text-sm">
                            {item.description}...
                        </p>
                        <p className="text-gray-500 text-xs mb-2">
                            Created by: {item.createdBy?.name || item.createdBy?.username || 'Unknown'}
                        </p>
                        <p className="text-gray-500 text-sm mb-3">
                            {new Date(item.createdAt).toLocaleString(undefined, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>

                        {canEditDelete(item) && (
                            <div className="flex gap-2">
                                <Link 
                                    to={`/archives/edit/${item.id}`}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                                >
                                    Edit
                                </Link>
                                <button 
                                    onClick={() => handleDelete(item.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        )}

                        {items.length === 0 && (
                        <div className="text-center text-gray-500 m-8">
                            <p>No items found.</p>
                            {canEditDelete && (
                                <Link 
                                    to="/archives/new" 
                                    className="text-blue-500 hover:underline"
                                >
                                    Create first item
                                </Link>
                            )}
                        </div>
                    )}

                    </div>
                ))}
            </div>
        </>
    )
}

export default ItemsList;