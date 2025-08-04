import { Link } from 'react-router-dom';

const UserSignupForm = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-black p-8 rounded-xl shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6 text-center text-white">Sign up as a reader</h1>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-100 mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-white bg-white text-black"
                            type="text"
                            id="user-name"
                            placeholder="Enter your name"
                        />
                        <label className="block text-gray-100 mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-white bg-white text-black"
                            type="text"
                            id="user-username"
                            placeholder="Enter your username"
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
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-800 transition"
                    >
                        Signup
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
