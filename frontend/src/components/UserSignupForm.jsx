import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../services/api';

const UserSignupForm = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleUserSignup = async (e) => {
        e.preventDefault();

        try {
            await api.post('/auth/signup', {
                name,
                username,
                email,
                password,
                role: 'user'
            })
            alert('User registered successfully!');
            navigate('/login');
        } catch (err) {
            console.error("Signup failed:", err.response?.data || err.message);
        }

    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-black p-8 rounded-xl shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6 text-center text-white">Sign up as a reader</h1>
                <form onSubmit={handleUserSignup}>
                    <div className="mb-4">
                        <label className="block text-gray-100 mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-white bg-white text-black"
                            type="text"
                            id="user-name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-100 mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-white bg-white text-black"
                            type="text"
                            id="user-username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-100 mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-white bg-white text-black"
                            type="email"
                            id="user-email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-100 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-white bg-white text-black"
                            type="password"
                            id="user-password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-800 transition"
                    >
                        Sign up
                    </button>
                    <p className="mt-4 text-center text-white">
                        Do you have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default UserSignupForm;
