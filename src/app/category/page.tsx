import React from 'react';
import CategoryList from '../_components/Companies';
import { useRouter } from 'next/navigation'; 

const Page = () => {
  const router = useRouter();

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
  if (currentUser === '') {
    router.push('/');
  }

  return (
    <div className='py-10'>
      <CategoryList userEmail={currentUser} />
    </div>
  );
};

export default Page; // Rename the component to start with an uppercase letter
