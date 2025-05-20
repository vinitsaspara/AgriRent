import React from 'react';
import axios from 'axios';

export function Login() {
  const handlesubmit = async (e) => {
    e.preventDefault();
    const userId = e.target.userId.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post(
        'http://localhost:5000/api/v1/user/login',
        {
          userId,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.data.success) {
        alert(res.data.message);
        localStorage.setItem('token', res.data.token);
        window.location.href = '/';
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Login failed');
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
