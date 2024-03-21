"use client";
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UserContext from '../context/UserContext';
import { api } from '~/trpc/react';
import { genSaltSync, hashSync } from "bcrypt-ts";

interface FormData {
    name: string;
    email: string;
    password: string;
}

const Form: React.FC = () => {
    const router = useRouter();

    const loadPotentialuser = api.auth.signup.useMutation({})

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: ''
    });

    const { email, setEmail } = useContext(UserContext);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const validateName = (name: string): string | null => {
        if (name.length < 3) {
            return 'Name must be at least 3 characters long';
        }
        return null;
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



    useEffect(() => {
        if (email != '') {
            router.push('/verify');
        }
    }, [email]);

    const handleSignUp = () => {
        console.log('Signing up with:', formData);
        const nameError = validateName(formData.name);
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);
        const hash = hashSync(formData.password, genSaltSync(10));
        console.log(hash);
        if (!nameError && !emailError && !passwordError) {
            loadPotentialuser.mutate({ name: formData.name, email: formData.email, password: hash.toString() })
            setEmail(formData.email);
        }
    };

    const handleLogin = () => {
        console.log('Logging in with:', formData);
        router.push('/login');
    };
    function getCookie(name: string): string {
        if (typeof document !== 'undefined') {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) {
                const cookieValue = parts.pop()?.split(';').shift();
                if (cookieValue !== undefined) {
                    console.log(cookieValue);
                    return cookieValue;
                }
            }
        }
        return '';
    }
    

    const currentUser = getCookie('currUser');
    console.log(currentUser);

    if (currentUser && currentUser !== '') {
        router.push('/category');
    }
    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center">Create your account</h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John wick"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@roc8.com"
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="*********"
                />
            </div>
            <div>
                <button
                    className="bg-black text-white font-bold py-2 px-4 rounded-md w-full mb-4"
                    onClick={handleSignUp}
                >
                    CREATE ACCOUNT
                </button>
                <p className="text-center text-gray-500">Have an Account? <span className="text-blue-500 cursor-pointer" onClick={handleLogin}>LOGIN</span></p>
            </div>
        </div>
    );
};

export default Form;