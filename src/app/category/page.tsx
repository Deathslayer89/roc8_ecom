"use client";
import React, { useEffect, useState } from 'react';
import CategoryList from '../_components/Companies';
import { useRouter } from 'next/navigation'; // Change import to next/router

const Page = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState('')
  useEffect(() => {
    const cuser = getCookie('currUser');
    const currUser = cuser || '';
    setCurrentUser(currUser);
    if (currentUser === '') {
      { async () => router.push('/'); }
    }
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  function getCookie(name: string): string {
    if (typeof document === 'undefined') {
      return ''; // Return empty string for server-side rendering
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
    <div className='py-10'>
      <CategoryList userEmail={currentUser} />
    </div>
  );
};

export default Page;
