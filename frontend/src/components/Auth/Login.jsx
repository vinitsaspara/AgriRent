/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant.js';
import { setLoading, setUser } from '@/redux/slices/userSlice.js';
import { redirect, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

export function Login() {

  const dispetch = useDispatch();
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const userId = e.target.userId.value;
    const password = e.target.password.value;

    try {
      dispetch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        {
          userId,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        console.log(res.data);
        dispetch(setUser(res.data?.user));
        navigate("/");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Login failed');
    }finally{
      dispetch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Login
        </h1>
        <form onSubmit={handlesubmit}>
          <input
            type="text"
            name="userId"
            placeholder="User ID"
            required
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    
    </div> 
  );
}

export default Login;
