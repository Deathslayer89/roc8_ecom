"use client";
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import UserContext from '../context/UserContext';
import { api } from '../../trpc/server'
const OTPVerificationPage: React.FC = () => {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const { email } = useContext(UserContext);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(otp);
    try {
      const user = await api.auth.verifyOTP({ email })
      router.push('/categories');
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <div>
      <h1>Verify OTP</h1>
      <p>Enter the 8-digit code you received on {email}.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={handleChange}
          maxLength={8}
        />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default OTPVerificationPage;