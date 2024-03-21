// "use client";
// import React, { useContext, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import UserContext from '../context/UserContext';
// import { api } from '~/trpc/react';
// import { genSaltSync, hashSync } from "bcrypt-ts";

// interface FormData {
//     name: string;
//     email: string;
//     password: string;
// }

// const Form: React.FC = () => {
//     const loadPotentialuser = api.auth.signup.useMutation({
//         onSuccess: () => {
//             router.push('/verify');
//         }
//     })

//     const [formData, setFormData] = useState<FormData>({
//         name: '',
//         email: '',
//         password: ''
//     });

//     const { setEmail } = useContext(UserContext);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };
//     const validateName = (name: string): string | null => {
//         if (name.length < 3) {
//             return 'Name must be at least 3 characters long';
//         }
//         return null;
//     };

//     const validateEmail = (email: string): string | null => {
//         if (!email) {
//             return 'Email is required';
//         }
//         // Basic email format validation
//         const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//         if (!emailRegex.test(email)) {
//             return 'Invalid email address';
//         }
//         return null;
//     };

//     const validatePassword = (password: string): string | null => {
//         if (password.length < 8) {
//             return 'Password must be at least 8 characters long';
//         }
//         // Check for lowercase, uppercase, and special character
//         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~]).*$/;
//         if (!passwordRegex.test(password)) {
//             return 'Password must contain at least one lowercase letter, one uppercase letter, and one special character';
//         }
//         return null;
//     };
//     const router = useRouter();

//     const handleSignUp = () => {
//         console.log('Signing up with:', formData);
//         const nameError = validateName(formData.name);
//         const emailError = validateEmail(formData.email);
//         const passwordError = validatePassword(formData.password);
//         const hash = hashSync(formData.password,genSaltSync(10));
//         console.log(hash);
//         if (!nameError && !emailError && !passwordError) {
//             loadPotentialuser.mutate({ name: formData.name, email: formData.email, password: hash.toString()})
//             setEmail(formData.email);
//             router.push('/verify');
//         }

//     };

//     const handleLogin = () => {
//         console.log('Logging in with:', formData);
//         router.push('/login');

//     };

//     return (
//         <div className="max-w-xs mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Create Your Account</h2>
//             <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
//                 <input
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     id="name"
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="Name"
//                 />
//             </div>
//             <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
//                 <input
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     id="email"
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="Email"
//                 />
//             </div>
//             <div className="mb-6">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
//                 <input
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     id="password"
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     placeholder="Password"
//                 />
//             </div>
//             <div className="flex justify-between">
//                 <button
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                     onClick={handleSignUp}
//                 >
//                     Sign Up
//                 </button>
//                 <button
//                     className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                     onClick={handleLogin}
//                 >
//                     Log In
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Form;
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
                    placeholder="Enter"
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
                    placeholder="Enter"
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
                    placeholder="Enter"
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