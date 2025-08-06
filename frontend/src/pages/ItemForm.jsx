import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';

const ItemForm = ({ editMode = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [itemData, setItemData] = useState({
    title: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    if (editMode && id) {
      const fetchItem = async () => {
        try {
          const response = await api.get(`/items/${id}`);
          setItemData(response.data);
        } catch (error) {
          console.error("Error fetching item:", error);
        }
      };
      fetchItem();
    }
  }, [editMode, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode && id) {
        await api.put(`/items/${id}`, itemData);
        alert('Item updated successfully!');
      } else {
        await api.post('/items', itemData);
        alert('Item created successfully!');
      }
      navigate('/archives');
    } catch (error) {
      console.error("Error saving item:", error);
      alert('Failed to save item. Please try again.');
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        {editMode ? 'Edit Item' : 'Create New Item'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="image"
          value={itemData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="border p-2 w-full"
          required
        />
        <input
          name="title"
          value={itemData.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 w-full"
          required
        />
        <textarea
          name="description"
          value={itemData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full"
          rows={5}
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editMode ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default ItemForm;
