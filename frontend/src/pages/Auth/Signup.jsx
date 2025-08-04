import { useState, useRef } from 'react';
import UserSignupForm from "../../components/UserSignupForm";
import ArchivistSignupForm from "../../components/ArchivistSignupForm";

const Signup = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const formSectionRef = useRef(null);

    const handleRoleSelection = (role) => {
        setSelectedRole(role);
        setTimeout(() => {
            formSectionRef.current?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    };

    return (
        <div className="min-h-screen">
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Start your journey!</h1>
                    <p className="text-lg text-gray-600">Choose your role to get started</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full px-4">
                    <div 
                        onClick={() => handleRoleSelection('reader')}
                        className="bg-white p-8 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 hover:border-blue-500"
                    >
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Reader</h3>
                            <p className="text-gray-600">Browse and read archived content</p>
                        </div>
                    </div>

                    <div 
                        onClick={() => handleRoleSelection('archiver')}
                        className="bg-black text-white p-8 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 hover:border-gray-600"
                    >
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">Archiver</h3>
                            <p className="text-gray-300">Create and manage archived content</p>
                        </div>
                    </div>
                </div>

                {selectedRole && (
                    <div className="mt-12 animate-bounce">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                )}
            </div>

            {selectedRole && (
                <div ref={formSectionRef} className="min-h-screen flex items-center justify-center">
                    <div className="w-full max-w-md">
                        {selectedRole === 'reader' && (
                            <div className="p-8">
                                <UserSignupForm />
                            </div>
                        )}
                        {selectedRole === 'archiver' && (
                            <div className="p-8">
                                <ArchivistSignupForm />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Signup;
