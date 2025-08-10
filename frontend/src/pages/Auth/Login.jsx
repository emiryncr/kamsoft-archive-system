
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post('/auth/login', {
                username,
                password
            });

            const { token, user } = res.data;
            login(token, {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                username: username
        });
            navigate('/');
        } catch (err) {
            console.error("Login failed:", err.response?.data || err.message);
            alert("Login failed. Please check your credentials.");
        }
    }

    return (
            <div className="flex items-center justify-center min-h-screen bg-gray-300">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                    <h1 className="text-2xl font-bold mb-6 text-center">Welcome, again!</h1>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-800 transition"
                    >
                        Login
                    </button>
                    <p className="mt-4 text-center text-gray-600">
                        Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Register</Link>
                    </p>
                    <p className="mt-4 text-center text-gray-600">
                        Or continue as <Link to="/" className="text-blue-600 hover:underline">Guest</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
