/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant.js';
import { setLoading, setUser } from '@/redux/slices/userSlice.js';
import { useNavigate } from 'react-router-dom'; // Removed 'redirect' as it's not used
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { Navbar } from '../pages/Navbar'; // Corrected path assuming Navbar is in 'pages'

export function Login() {
  const dispatch = useDispatch(); // Corrected variable name from dispetch to dispatch
  const navigate = useNavigate();

  const handleSubmit = async (e) => { // Corrected function name from handlesubmit to handleSubmit
    e.preventDefault();
    const userId = e.target.userId.value;
    const password = e.target.password.value;

    try {
      dispatch(setLoading(true));
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
        dispatch(setUser(res.data?.user));
        navigate("/");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Login failed'); // Changed alert to toast.error for consistency
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-800">
              Sign in to AgriRent
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="userId" className="sr-only">
                  User ID
                </label>
                <input
                  id="userId"
                  name="userId"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm transition-shadow duration-300 ease-in-out hover:shadow-md"
                  placeholder="User ID"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm transition-shadow duration-300 ease-in-out hover:shadow-md"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="font-medium text-emerald-600 hover:text-emerald-500 hover:underline">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;