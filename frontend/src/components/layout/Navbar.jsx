import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth'

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  }

  const canAddItems = user && (user.role === 'archiver' || user.role === 'admin');

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link to="/" className="text-lg font-bold">KamSoft</Link>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/archives">Archives</Link>
        {canAddItems && <Link to="/add">Add Item</Link>}
        {!user && <Link to="/login">Login</Link>}
        {user && <button onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;