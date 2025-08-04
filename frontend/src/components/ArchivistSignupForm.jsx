import { Link } from 'react-router-dom';

const ArchivistSignupForm = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign up as an archivist</h1>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            id="archivist-name"
                            placeholder="Enter your name"
                        />
                        <label className="block text-gray-700 mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            id="archivist-username"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="email"
                            id="archivist-email"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                            id="archivist-password"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-800 transition"
                    >
                        Signup
                    </button>
                    <p className="mt-4 text-center text-gray-600">
                        Do you have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default ArchivistSignupForm;