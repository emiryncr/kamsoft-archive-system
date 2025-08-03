import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link to="/" className="text-lg font-bold">KamSoft</Link>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/archives">Archives</Link>
        <Link to="/items/new">New Item</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;