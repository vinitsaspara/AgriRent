// Navbar.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { USER_API_END_POINT } from '@/utils/constant.js';

export function Navbar() {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // 1. Call API to clear cookie
            await axios.post(`${USER_API_END_POINT}/logout`, {}, {
                withCredentials: true,
            });

            // 2. Clear Redux state and redirect
            dispatch(logout());
            toast.success('Logged out successfully');
            navigate('/login');
        } catch (error) {
            toast.error('Logout failed');
            console.error('Logout error:', error.message);
        }
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-semibold">AgriRent</div>
                <ul className="flex space-x-4">
                    <li>
                        <a href="/" className="text-gray-300 hover:text-white">Home</a>
                    </li>
                    {user?.role === "Admin" && (
                        <li>
                            <a href="/add-employee" className="text-gray-300 hover:text-white">Add Employee</a>
                        </li>
                    )}
                    <li>
                        <button
                            onClick={handleLogout}
                            className="text-gray-300 hover:text-white"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
