"use client"
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie' 

const LogOut = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
        await axios.post('http://localhost:5000/user/logout', { withCredentials: true });
        // call your logout API
        Cookies.remove('token');
        Cookies.remove('role');
        Cookies.remove('userId');
        Cookies.remove('userFullname');
      router.push('/Login');            // redirect to login page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        className='border bg-gradient-to-r from-blue-500 to-purple-500 text-white py-1 px-3 hover:scale-105 hover:shadow-lg rounded-md mr-2 cursor-pointer'
      >
        <h1 className='text-white font-bold'>Logout</h1>
      </button>
    </div>
  );
};

export default LogOut;
