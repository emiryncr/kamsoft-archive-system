import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import api from '../services/api';

const ItemsList = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('newest');
    const { user } = useAuth();
    const [viewerOpen, setViewerOpen] = useState(false);
    const [currentFile, setCurrentFile] = useState(null);

    const handleViewFile = (fileId, mimeType) => {
        setCurrentFile({
            id: fileId,
            type: mimeType,
            url: `http://localhost:5000/api/upload/file/${fileId}`
        });
        setViewerOpen(true);
    };

    const closeViewer = () => {
        setViewerOpen(false);
        setCurrentFile(null);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const response = await api.get('/items');
            setItems(response.data);
        } catch (error) {
            console.error("Error fetching items:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this archive?')) {
            try {
                await api.delete(`/items/${id}`);
                setItems(items.filter(item => item._id !== id));
                alert('Archive deleted successfully!');
            } catch (error) {
                console.error("Error deleting item:", error);
                alert('Failed to delete archive. Please try again.');
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
    };

    const getFormatIcon = (format) => {
        switch (format) {
            case 'Text':
                return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
            case 'Image':
                return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
            case 'Audio':
                return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>;
            case 'Video':
                return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
            default:
                return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>;
        }
    };

    const getConditionColor = (condition) => {
        switch (condition) {
            case 'Excellent': return 'bg-green-100 text-green-800';
            case 'Good': return 'bg-blue-100 text-blue-800';
            case 'Fair': return 'bg-yellow-100 text-yellow-800';
            case 'Poor': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getAccessLevelIcon = (accessLevel) => {
        switch (accessLevel) {
            case 'Public':
                return <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
            case 'Restricted':
                return <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
            case 'Private':
                return <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" /></svg>;
            default: return null;
        }
    };

const filteredAndSortedItems = items
    .filter(item => {
        const title = item.title || '';
        const description = item.description || '';
        const keywords = Array.isArray(item.keywords) ? item.keywords.join(' ') : '';
        const tags = Array.isArray(item.tags) ? item.tags.join(' ') : '';
        const subject = Array.isArray(item.subject) ? item.subject.join(' ') : '';
        const searchLower = searchTerm.toLowerCase();
        
        return title.toLowerCase().includes(searchLower) ||
               description.toLowerCase().includes(searchLower) ||
               keywords.toLowerCase().includes(searchLower) ||
               tags.toLowerCase().includes(searchLower) ||
               subject.toLowerCase().includes(searchLower);
    })
    .sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return new Date(b.createdAt) - new Date(a.createdAt);
            case 'oldest':
                return new Date(a.createdAt) - new Date(b.createdAt);
            case 'title':
                // eslint-disable-next-line no-case-declarations
                const titleA = a.title || '';
                // eslint-disable-next-line no-case-declarations
                const titleB = b.title || '';
                return titleA.localeCompare(titleB);
            default:
                return 0;
        }
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-xl text-gray-600">Loading archives...</p>
                </div>
            </div>
        );
    }

    const FileViewer = ({ file, onClose }) => {
    if (!file) return null;

    const renderContent = () => {
            if (file.type === 'application/pdf') {
                return (
                    <iframe
                        src={file.url}
                        width="100%"
                        height="600px"
                        title="PDF Viewer"
                        className="border-none"
                    />
                );
            } else if (file.type?.startsWith('image/')) {
                return (
                    <img
                        src={file.url}
                        alt="Archive Content"
                        className="max-w-full max-h-[600px] object-contain mx-auto"
                    />
                );
            } else if (file.type?.startsWith('video/')) {
                return (
                    <video
                        controls
                        width="100%"
                        height="600px"
                        className="max-h-[600px]"
                    >
                        <source src={file.url} type={file.type} />
                        Your browser does not support the video tag.
                    </video>
                );
            } else {
                return (
                    <div className="text-center py-16">
                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-gray-600 mb-4">Preview not available for this file type</p>
                        <a
                            href={file.url}
                            download
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Download File
                        </a>
                    </div>
                );
            }
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
                    <div className="flex items-center justify-between p-4 border-b">
                        <h3 className="text-lg font-semibold">Archive Content</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                        >
                            ×
                        </button>
                    </div>
                    <div className="overflow-auto max-h-[calc(90vh-80px)]">
                        {renderContent()}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Archive Collection
                            </h1>
                            <p className="text-gray-600">
                                Discover and explore {items.length} archives from our community
                            </p>
                        </div>
                        {user && (user.role === 'archiver' || user.role === 'admin') && (
                            <Link
                                to="/archives/new"
                                className="mt-4 md:mt-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Add New Archive</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex-1 max-w-lg">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search archives, keywords, tags..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="title">By Title</option>
                            </select>

                            <div className="flex bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-md transition-colors ${
                                        viewMode === 'grid' 
                                            ? 'bg-white text-blue-600 shadow-sm' 
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-md transition-colors ${
                                        viewMode === 'list' 
                                            ? 'bg-white text-blue-600 shadow-sm' 
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-gray-600">
                        {searchTerm ? (
                            <>Showing {filteredAndSortedItems.length} results for "{searchTerm}"</>
                        ) : (
                            <>Showing all {filteredAndSortedItems.length} archives</>
                        )}
                    </p>
                </div>

                {filteredAndSortedItems.length === 0 ? (
                    <div className="text-center py-16">
                        <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">
                            {searchTerm ? 'No archives found' : 'No archives yet'}
                        </h3>
                        <p className="text-gray-500 mb-6">
                            {searchTerm 
                                ? 'Try adjusting your search terms.' 
                                : 'Be the first to create an archive!'
                            }
                        </p>
                        {!searchTerm && (
                            <Link
                                to="/archives/new"
                                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Create First Archive
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className={
                        viewMode === 'grid' 
                            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            : "space-y-4"
                    }>
                        {filteredAndSortedItems.map(item => (
                            viewMode === 'grid' ? (
                                <div key={item.id || item._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                                    <div className="relative">
                                        <img 
                                            src={item.image || 'https://via.placeholder.com/400x200?text=No+Image'} 
                                            alt={item.title} 
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                                        />
                                        {isMyItem(item) && (
                                            <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                                Your Archive
                                            </div>
                                        )}

                                        <div className="absolute top-3 left-3 flex items-center space-x-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                                            {getAccessLevelIcon(item.accessLevel)}
                                            <span>{item.accessLevel || 'Public'}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                                            {item.title || 'Untitled Archive'}
                                        </h3>

                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {item.category && (
                                                <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                                    {item.category}
                                                </span>
                                            )}
                                            {item.format && (
                                                <span className="inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                                                    {getFormatIcon(item.format)}
                                                    <span>{item.format}</span>
                                                </span>
                                            )}
                                            {item.condition && (
                                                <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getConditionColor(item.condition)}`}>
                                                    {item.condition}
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                            {item.description || 'No description available.'}
                                        </p>

                                        {(item.period || item.language) && (
                                            <div className="text-xs text-gray-500 mb-3 space-y-1">
                                                {item.period && (
                                                    <div className="flex items-center">
                                                        <span className="font-medium">Period:</span>
                                                        <span className="ml-1">{item.period}</span>
                                                    </div>
                                                )}
                                                {item.language && (
                                                    <div className="flex items-center">
                                                        <span className="font-medium">Language:</span>
                                                        <span className="ml-1">{item.language}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {(item.keywords?.length > 0 || item.tags?.length > 0) && (
                                            <div className="mb-3">
                                                <div className="flex flex-wrap gap-1">
                                                    {item.keywords?.slice(0, 3).map((keyword, index) => (
                                                        <span key={index} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                                                            {keyword}
                                                        </span>
                                                    ))}
                                                    {item.tags?.slice(0, 2).map((tag, index) => (
                                                        <span key={index} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        
                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                            <span className="flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                {item.createdBy?.name || item.createdBy?.username || 'Unknown'}
                                            </span>
                                            <span className="flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {new Date(item.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>

                                        {item.viewCount > 0 && (
                                            <div className="flex items-center justify-between text-xs text-gray-500 mb-3 pt-2 border-t border-gray-100">
                                                <span className="flex items-center">
                                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    {item.viewCount} views
                                                </span>
                                            </div>
                                        )}

                                        {item.uploadedFile && item.uploadedFile.fileId && (
                                            <div className="mb-3 pt-2 border-t border-gray-100">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center text-xs text-gray-600">
                                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                            </svg>
                                                            <span>{item.uploadedFile.originalName}</span>
                                                            <span className="ml-2 text-gray-400">
                                                            ({(item.uploadedFile.size / 1024 / 1024).toFixed(1)}MB)
                                                            </span>
                                                        </div>
                                                        <div className="flex space-x-1">
                                                            <button
                                                                onClick={() => handleViewFile(item.uploadedFile.fileId, item.uploadedFile.mimeType)}
                                                                className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200 transition-colors"
                                                                title="View Content"
                                                            >
                                                                View
                                                            </button>
                                                            <a
                                                                href={`http://localhost:5000/api/upload/file/${item.uploadedFile.fileId}`}
                                                                download={item.uploadedFile.originalName}
                                                                className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition-colors"
                                                                title="Download"
                                                            >
                                                                Download
                                                            </a>
                                                        </div>
                                                    </div>
                                            </div>
                                        )}

                                        {canEditDelete(item) && (
                                            <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
                                                <Link 
                                                    to={`/archives/edit/${item.id || item._id}`}
                                                    className="w-9 h-9 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                                                    title="Edit Archive"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(item.id || item._id)}
                                                    className="w-9 h-9 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                                                    title="Delete Archive"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div key={item.id || item._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex items-start space-x-4">
                                        <div className="relative flex-shrink-0">
                                            <img 
                                                src={item.image || 'https://via.placeholder.com/150x100?text=No+Image'} 
                                                alt={item.title} 
                                                className="w-24 h-16 object-cover rounded-lg" 
                                            />
                                            {isMyItem(item) && (
                                                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                                    Yours
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className="text-xl font-semibold text-gray-900">
                                                        {item.title}
                                                    </h3>
                                                    
                                                    {canEditDelete(item) && (
                                                        <div className="hidden sm:flex space-x-2 ml-4">
                                                            <Link 
                                                                to={`/archives/edit/${item.id || item._id}`}
                                                                className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition-colors font-medium"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button 
                                                                onClick={() => handleDelete(item.id || item._id)}
                                                                className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition-colors font-medium"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                                        {item.category || 'Uncategorized'}
                                                    </span>
                                                    <span className="inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                                                        {getFormatIcon(item.format)}
                                                        <span>{item.format || 'Unknown'}</span>
                                                    </span>
                                                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getConditionColor(item.condition)}`}>
                                                        {item.condition || 'Unknown'}
                                                    </span>
                                                    <span className="inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                                                        {getAccessLevelIcon(item.accessLevel)}
                                                        <span>{item.accessLevel || 'Public'}</span>
                                                    </span>
                                                </div>

                                                <p className="text-gray-600 mb-3 line-clamp-2">
                                                    {item.description}
                                                </p>
                                                
                                                {item.uploadedFile && item.uploadedFile.fileId && (
                                                    <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                                                            <div className="flex items-center text-sm text-gray-700">
                                                                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                </svg>
                                                                <span className="truncate">{item.uploadedFile.originalName}</span>
                                                                <span className="ml-2 text-gray-500 text-xs flex-shrink-0">
                                                                    ({(item.uploadedFile.size / 1024 / 1024).toFixed(1)}MB)
                                                                </span>
                                                            </div>
                                                            <div className="flex space-x-2">
                                                                <button
                                                                    onClick={() => handleViewFile(item.uploadedFile.fileId, item.uploadedFile.mimeType)}
                                                                    className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors font-medium"
                                                                    title="View Content"
                                                                >
                                                                    View
                                                                </button>
                                                                <a
                                                                    href={`http://localhost:5000/api/upload/file/${item.uploadedFile.fileId}`}
                                                                    download={item.uploadedFile.originalName}
                                                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors font-medium"
                                                                    title="Download"
                                                                >
                                                                    Download
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                
                                                <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4 mb-3">
                                                    <span className="flex items-center">
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                        {item.createdBy?.name || item.createdBy?.username || 'Unknown'}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        {new Date(item.createdAt).toLocaleDateString()}
                                                    </span>
                                                    {item.period && (
                                                        <span className="hidden sm:inline">Period: {item.period}</span>
                                                    )}
                                                    {item.viewCount > 0 && (
                                                        <span className="hidden sm:inline">{item.viewCount} views</span>
                                                    )}
                                                </div>

                                                {canEditDelete(item) && (
                                                    <div className="flex sm:hidden space-x-2 pt-3 border-t border-gray-200">
                                                        <Link 
                                                            to={`/archives/edit/${item.id || item._id}`}
                                                            className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-600 transition-colors font-medium text-center"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button 
                                                            onClick={() => handleDelete(item.id || item._id)}
                                                            className="flex-1 bg-red-500 text-white px-3 py-2 rounded-md text-sm hover:bg-red-600 transition-colors font-medium"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                )}
            </div>
        
            {viewerOpen && (
                <FileViewer
                    file={currentFile}
                    onClose={closeViewer}
                />
            )}
        </div>
    );
};

export default ItemsList;