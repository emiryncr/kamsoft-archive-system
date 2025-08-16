import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';

const ItemForm = ({ editMode = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [itemData, setItemData] = useState({
    title: '',
    description: '',
    image: '',
    category: 'Other',
    format: 'Other',
    condition: 'Good',
    period: '',
    subject: '',
    keywords: '',
    language: 'English',
    source: '',
    donor: '',
    acquisitionDate: '',
    originalLocation: '',
    isPublic: true,
    accessLevel: 'Public',
    copyrightStatus: '',
    dimensions: '',
    tags: ''
  });

  useEffect(() => {
    if (editMode && id) {
      const fetchItem = async () => {
        try {
          const response = await api.get(`/items/${id}`);
          const item = response.data;
          
          setItemData({
            ...item,
            subject: Array.isArray(item.subject) ? item.subject.join(', ') : item.subject || '',
            keywords: Array.isArray(item.keywords) ? item.keywords.join(', ') : item.keywords || '',
            tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags || '',
            acquisitionDate: item.acquisitionDate ? item.acquisitionDate.split('T')[0] : ''
          });
        } catch (error) {
          console.error("Error fetching item:", error);
        }
      };
      fetchItem();
    }
  }, [editMode, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setItemData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const processedData = {
        ...itemData,
        subject: itemData.subject ? itemData.subject.split(',').map(s => s.trim()).filter(Boolean) : [],
        keywords: itemData.keywords ? itemData.keywords.split(',').map(k => k.trim()).filter(Boolean) : [],
        tags: itemData.tags ? itemData.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        acquisitionDate: itemData.acquisitionDate || undefined
      };

      if (editMode && id) {
        await api.put(`/items/${id}`, processedData);
        alert('Archive updated successfully!');
      } else {
        await api.post('/items', processedData);
        alert('Archive created successfully!');
      }
      navigate('/archives');
    } catch (error) {
      console.error("Error saving item:", error);
      alert('Failed to save archive. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={editMode ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" : "M12 4v16m8-8H4"} />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {editMode ? 'Edit Archive Item' : 'Create New Archive Item'}
              </h1>
              <p className="text-gray-600">
                {editMode ? 'Update your archive details below' : 'Add a new item to your archive collection'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input
                    name="title"
                    type="text"
                    value={itemData.title}
                    onChange={handleChange}
                    placeholder="Enter archive title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={itemData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Documents">Documents</option>
                    <option value="Photographs">Photographs</option>
                    <option value="Audio">Audio</option>
                    <option value="Video">Video</option>
                    <option value="Artifacts">Artifacts</option>
                    <option value="Digital">Digital</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={itemData.description}
                  onChange={handleChange}
                  placeholder="Describe your archive item..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  name="image"
                  type="url"
                  value={itemData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {itemData.image && (
                  <div className="mt-3">
                    <img
                      src={itemData.image}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Archival Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                  <select
                    name="format"
                    value={itemData.format}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Text">Text</option>
                    <option value="Image">Image</option>
                    <option value="Audio">Audio</option>
                    <option value="Video">Video</option>
                    <option value="PDF">PDF</option>
                    <option value="Digital">Digital</option>
                    <option value="Physical">Physical</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                  <select
                    name="condition"
                    value={itemData.condition}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
                  <input
                    name="period"
                    type="text"
                    value={itemData.period}
                    onChange={handleChange}
                    placeholder="e.g., 1920s, Medieval, Modern"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <input
                    name="language"
                    type="text"
                    value={itemData.language}
                    onChange={handleChange}
                    placeholder="e.g., English, Spanish, French"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions</label>
                  <input
                    name="dimensions"
                    type="text"
                    value={itemData.dimensions}
                    onChange={handleChange}
                    placeholder="e.g., 8.5x11 inches, 30x40 cm"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Acquisition Date</label>
                  <input
                    name="acquisitionDate"
                    type="date"
                    value={itemData.acquisitionDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject Areas (comma-separated)</label>
                  <input
                    name="subject"
                    type="text"
                    value={itemData.subject}
                    onChange={handleChange}
                    placeholder="History, Art, Science"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Keywords (comma-separated)</label>
                  <input
                    name="keywords"
                    type="text"
                    value={itemData.keywords}
                    onChange={handleChange}
                    placeholder="keyword1, keyword2, keyword3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                <input
                  name="tags"
                  type="text"
                  value={itemData.tags}
                  onChange={handleChange}
                  placeholder="tag1, tag2, tag3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Source & Provenance
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
                  <input
                    name="source"
                    type="text"
                    value={itemData.source}
                    onChange={handleChange}
                    placeholder="Where did this item come from?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Donor</label>
                  <input
                    name="donor"
                    type="text"
                    value={itemData.donor}
                    onChange={handleChange}
                    placeholder="Who provided this item?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Original Location</label>
                  <input
                    name="originalLocation"
                    type="text"
                    value={itemData.originalLocation}
                    onChange={handleChange}
                    placeholder="Geographic origin"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Copyright Status</label>
                  <input
                    name="copyrightStatus"
                    type="text"
                    value={itemData.copyrightStatus}
                    onChange={handleChange}
                    placeholder="e.g., Public Domain, Copyrighted"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Access Control
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Access Level</label>
                  <select
                    name="accessLevel"
                    value={itemData.accessLevel}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Public">Public</option>
                    <option value="Restricted">Restricted</option>
                    <option value="Private">Private</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isPublic"
                    id="isPublic"
                    checked={itemData.isPublic}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">
                    Make this archive publicly visible
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/archives')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
              >
                {editMode ? 'Update Archive' : 'Create Archive'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ItemForm;