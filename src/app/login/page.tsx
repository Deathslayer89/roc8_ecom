"use client";
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import UserContext from '../context/UserContext';


interface FormData {
    name: string;
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: ''
    });
    const { setEmail } = useContext(UserContext);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const router = useRouter();
    const handleSignUp = () => {
        console.log('Signing up with:', formData);
        setEmail(formData.email);
        router.push('/');
    };

    const handleLogin = () => {
        console.log('Logging in with:', formData);
    };

    return (
        <div className="max-w-xs mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-xl font-semibold mb-4">Login</h1>
            <h2>Welcome back to Ecommerce</h2>
            <p> The nextgen business marketplace. </p>
            
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                />
            </div>
            <div className="flex justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleSignUp}
                >
                    Sign Up
                </button>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleLogin}
                >
                    Log In
                </button>
            </div>
        </div>
    );
};

export default Login;