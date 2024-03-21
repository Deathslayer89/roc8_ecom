"use client";
import React from 'react'
import CategoryList from '../_components/Companies'
import { useRouter } from 'next/navigation';

const page = () => {

  const router = useRouter();


  function getCookie(name): string {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  }

  const currentUser = getCookie('currUser');

  console.log(currentUser)
  if (currentUser === '') {
    router.push('/');
  }
  return (
    <div className='py-10'>
      <CategoryList userEmail={currentUser} />
    </div>

  )
}

export default page