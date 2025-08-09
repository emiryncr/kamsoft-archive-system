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
  }

  const canAddItems = user && (user.role === 'archiver' || user.role === 'admin');

  return (
    <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <Link to="/" className="text-lg font-bold">KamSoft</Link>
      
      <button
        className="md:hidden block"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="hidden md:flex items-center space-x-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/archives" className="hover:text-gray-300">Archives</Link>
        {canAddItems && <Link to="/archives/new" className="hover:text-gray-300">Add Archive</Link>}

        {!user ? (
          <Link to="/login" className="hover:text-gray-300">Login</Link>
        ) : (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-600 ring-inset hover:bg-gray-600"
            >
              {user.name || user.username || 'User'}
              <svg viewBox="0 0 20 20" fill="currentColor" className="-mr-1 size-5 text-gray-300">
                <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 z-50">
                <div className="py-1">
                  <div className="block px-4 py-2 text-sm text-gray-500 border-b">
                    Role: {user.role}
                  </div>
                  <Link 
                    to="/profile" 
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Profile Settings
                  </Link>
                  {canAddItems && (
                    <Link 
                      to="/dashboard" 
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Dashboard
                    </Link>
                  )}
                  {user.role === 'admin' && (
                    <>
                      <Link
                          to="/user-management"
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          User Management
                      </Link>
                      <Link
                        to="/archive-management"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                          Archive Management
                      </Link>
                    </>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'} absolute top-16 left-0 w-full bg-gray-800 p-4 z-10`}>
        <div className="flex flex-col space-y-2">
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-gray-300">Home</Link>
          <Link to="/archives" onClick={() => setMenuOpen(false)} className="hover:text-gray-300">Archives</Link>
          {canAddItems && <Link to="/archives/new" onClick={() => setMenuOpen(false)} className="hover:text-gray-300">Add Archive</Link>}
          {!user ? (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-gray-300">Login</Link>
          ) : (
            <>
              <div className="text-sm text-gray-300 border-b border-gray-600 pb-2">
                {user.name || user.username} ({user.role})
              </div>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="hover:text-gray-300">Profile</Link>
              {canAddItems && <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="hover:text-gray-300">Dashboard</Link>}
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-left hover:text-gray-300">
                Sign out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;