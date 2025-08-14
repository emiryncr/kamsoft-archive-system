import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  const canAddItems = user && (user.role === 'archiver' || user.role === 'admin');

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              KamSoft
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Home
            </Link>
            <Link to="/archives" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Archives
            </Link>
            {canAddItems && (
            <Link 
              to="/archives/new" 
              className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="relative flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Archive</span>
              </div>
            </Link>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/signup" 
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  Sign Up
                </Link>
                <Link 
                  to="/login" 
                  className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200 font-medium"
                >
                  Login
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {(user.name || user.username)?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name || user.username}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">{user.role}</div>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="text-sm font-medium text-gray-900">{user.name || user.username}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                      <div className="text-xs text-blue-600 capitalize font-medium mt-1">{user.role}</div>
                    </div>
                    
                    <div className="py-2">
                      <Link 
                        to="/profile" 
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile Settings
                      </Link>
                      
                      {user.role === 'admin' && (
                        <>
                          <Link
                            to="/user-management"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                            User Management
                          </Link>
                          <Link
                            to="/archive-management"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            Archive Management
                          </Link>
                        </>
                      )}
                    </div>
                    
                    <div className="border-t border-gray-100 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                onClick={() => setMenuOpen(false)} 
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2"
              >
                Home
              </Link>
              <Link 
                to="/archives" 
                onClick={() => setMenuOpen(false)} 
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2"
              >
                Archives
              </Link>
              {canAddItems && (
                <Link 
                  to="/archives/new" 
                  onClick={() => setMenuOpen(false)} 
                  className="text-blue-600 font-medium py-2"
                >
                  + Add Archive
                </Link>
              )}
              
              {!user ? (
                <>
                  <Link 
                    to="/signup" 
                    onClick={() => setMenuOpen(false)} 
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2"
                  >
                    Sign Up
                  </Link>
                  <Link 
                    to="/login" 
                    onClick={() => setMenuOpen(false)} 
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-center font-medium"
                  >
                    Login
                  </Link>
                </>
              ) : (
                <>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex items-center space-x-3 py-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {(user.name || user.username)?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name || user.username}</div>
                        <div className="text-xs text-gray-500 capitalize">{user.role}</div>
                      </div>
                    </div>
                  </div>
                  
                  <Link 
                    to="/profile" 
                    onClick={() => setMenuOpen(false)} 
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2"
                  >
                    Profile
                  </Link>
                  {user.role === 'admin' && (
                    <>
                      <Link
                        to="/user-management"
                        onClick={() => setMenuOpen(false)}
                        className="text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2"
                      >
                        User Management
                      </Link>
                      <Link
                        to="/archive-management"
                        onClick={() => setMenuOpen(false)}
                        className="text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2"
                      >
                        Archive Management
                      </Link>
                    </>
                  )}
                  <button 
                    onClick={() => { handleLogout(); setMenuOpen(false); }} 
                    className="text-left text-red-600 hover:text-red-700 transition-colors duration-200 py-2"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;