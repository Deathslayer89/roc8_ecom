"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from "~/trpc/react";

interface FormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const router = useRouter();
    const handleSignUp =() => {
        router.push('/signup');
    };

    const validateLogin = api.auth.validateLogin.useQuery({ email: formData.email, password: formData.password });

    const handleLogin = async () => {
        console.log('Logging in with:', formData);
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);

        if (!emailError && !passwordError && validateLogin.status == 'success') {
            console.log('in login handle')
            document.cookie = `currUser=${formData.email}; expires=` + new Date(Date.now() + 86400 * 1000).toUTCString();
            router.push('/category');
        }
    };

    const validateEmail = (email: string): string | null => {
        if (!email) {
            return 'Email is required';
        }
        // Basic email format validation
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(email)) {
            return 'Invalid email address';
        }
        return null;
    };

    const validatePassword = (password: string): string | null => {
        if (password.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        // Check for lowercase, uppercase, and special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~]).*$/;
        if (!passwordRegex.test(password)) {
            return 'Password must contain at least one lowercase letter, one uppercase letter, and one special character';
        }
        return null;
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
            <h2 className="text-lg font-semibold mb-2 text-center">Welcome back to ECOMMERCE</h2>
            <p className="text-center mb-6">The next gen business marketplace</p>

            <div className="mb-4">
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
            <div className="mb-6 relative">
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                />
                <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-gray-700 focus:outline-none focus:shadow-outline"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? 'Hide' : 'Show'}
                </button>
            </div>
            <button
                className="w-full bg-black text-white font-semibold py-2 px-4 rounded-md mb-4 focus:outline-none focus:shadow-outline"
                onClick={handleLogin}
            >
                LOGIN
            </button>
            <p className="text-center">
                Dont have an Account?{' '}
                <button
                    className="text-blue-500 hover:text-blue-700 font-semibold"
                    onClick={handleSignUp}
                >
                    SIGN UP
                </button>
            </p>
        </div>
    );
};

export default Login;