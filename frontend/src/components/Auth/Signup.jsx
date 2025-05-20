import axios from 'axios';
import React from 'react';

export function Signup() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = e.target.userId.value;
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;
    const age = parseInt(e.target.age.value);
    const phoneNumber = e.target.phoneNumber.value;
    const role = e.target.role.value;

    const payload = {
      userId,
      fullName,
      email,
      password,
      address,
      age,
      phoneNumber,
      role,
    };

    try {
      const res = await axios.post(
        'http://localhost:5000/api/v1/user/signup',
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (res.data.success) {
        alert(res.data.message);
        window.location.href = '/';
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error('Signup error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-md shadow-md p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Signup</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="userId"
            placeholder="User ID"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="example@abc.com"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="address"
            placeholder="Address"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            name="role"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Role</option>
            <option value="Farmer">Farmer</option>
            <option value="Admin">Admin</option>
            <option value="Taluka">Taluka</option>
            <option value="District">District</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
