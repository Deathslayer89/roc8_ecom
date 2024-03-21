"use client";
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import UserContext from '../context/UserContext';
import { api } from "~/trpc/react";
import { genSaltSync, hashSync } from "bcrypt-ts";


interface FormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {

    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const router = useRouter();
    const handleSignUp = () => {
        router.push('/');
    };

   
    const handleLogin = async () => {
        console.log('Logging in with:', formData);
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);
        const hash = hashSync(formData.password, genSaltSync(10));

        if (!emailError && !passwordError) {
            if (api.auth.validateLogin.useQuery({ email: formData.email, password: formData.password })) {
                console.log('logindone')
                router.push('/category');
            } else {
                console.log('loginfailure')
            }
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