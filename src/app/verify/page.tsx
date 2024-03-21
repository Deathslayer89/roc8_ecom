"use client";
import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserContext from '../context/UserContext';
import { api } from '../../trpc/react';

const OTPVerificationPage: React.FC = () => {
    const router = useRouter();
    const [otp, setOtp] = useState('');
    const { email, setEmail } = useContext(UserContext);
    const verifyOTP = api.auth.verifyOTP.useMutation();

    useEffect(() => {
        // This code will run only in the browser
        const currentUser = getCookie('currUser');
        console.log(currentUser);
        if (email === '') {
            router.push('/');
        }


    }, []); // Empty dependency array ensures this effect runs only once after the initial render

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(otp);
        try {
            const user = await verifyOTP.mutateAsync({ email, otp });
            const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day in milliseconds
            document.cookie = `currUser=${email}; expires=${expirationDate.toUTCString()} path=/`;
            setEmail('');
            router.push('/category');
        } catch (e) {
            console.log(e);
        }
    };

    function getCookie(name: string): string {
        if (typeof document === 'undefined') {
            return ''; // If document is not available (server-side rendering), return an empty string
        }
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            const cookieValue = parts.pop()?.split(';').shift();
            if (cookieValue !== undefined) {
                console.log(cookieValue);
                return cookieValue;
            }
        }
        return '';
    }

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center">Verify your email</h2>
            <p className="text-gray-700 mb-4 text-center">
                Enter the 8 digit code you have received on <span className="font-semibold">{email}</span>
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <div className="flex mb-6">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={otp[index] ?? ''}
                            onChange={(e) => {
                                const newOtp = otp.split('');
                                newOtp[index] = e.target.value;
                                setOtp(newOtp.join(''));
                            }}
                            className="w-12 h-12 text-center text-xl font-semibold border border-gray-400 rounded mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))}
                </div>
                <button
                    type="submit"
                    className="bg-black text-white font-bold py-2 px-4 rounded-md w-full"
                >
                    VERIFY
                </button>
            </form>
        </div>
    );
};

export default OTPVerificationPage;
