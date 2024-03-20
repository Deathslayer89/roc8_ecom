/* eslint-disable @typescript-eslint/no-empty-function */
"use client";
import React, { createContext, useState } from 'react';

interface UserContextValue {
  email: string;
  setEmail: (email: string) => void;
}

const UserContext = createContext<UserContextValue>({
  email: '',
  setEmail: () => {},
});

export const UserProvider= ({ children }:{children:React.ReactNode}) => {
  const [email, setEmail] = useState('');

  return (
    <UserContext.Provider value={{ email, setEmail }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;