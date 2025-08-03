import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const mockItems = [
  { id: 1, title: 'Item 1', description: 'Description for Item 1', image: 'https://placehold.net/400x400.png' },
  { id: 2, title: 'Item 2', description: 'Description for Item 2', image: 'https://placehold.net/400x400.png' },
  { id: 3, title: 'Item 3', description: 'Description for Item 3', image: 'https://placehold.net/400x400.png' }
];

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
      const found = mockItems.find((item) => item.id === parseInt(id));
      if (found) {
        setItemData(found);
      }
    }
  }, [editMode, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      console.log('Updating item:', itemData);
    } else {
      console.log('Creating item:', itemData);
    }
    navigate('/archives');
  };

  return (
    <div className="p-4">
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
