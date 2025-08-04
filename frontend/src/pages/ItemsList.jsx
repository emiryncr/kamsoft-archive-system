import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ItemsList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        api.get('/items')
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error("Error fetching items:", error);
            });
    }, []);

    return (
        <>
            <h2 className="text-2xl font-bold m-4">Archives</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map(item => (
                    <div key={item.id} className="border rounded p-4">
                        <img src={item.image} alt={item.name} className="w-full h-32 object-cover mb-2" />
                        <h2 className="text-xl font-bold">{item.title}</h2>
                        <p>
                            {new Date(item.createdAt).toLocaleString(undefined, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ItemsList;