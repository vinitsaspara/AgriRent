import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import Equipment from './Equipment';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { EQUIPMENT_API_END_POINT } from '@/utils/constant.js';
import AdminEquipmentPage from './AdminEquipmentPage';

const HomePage = () => {
  const { user } = useSelector((state) => state.user);
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== 'Farmer') {
      setEquipments([]);
      setLoading(false);
      return;
    }

    const fetchEquipments = async () => {
      try {
        const response = await axios.get(`${EQUIPMENT_API_END_POINT}/get-all-equipment`, {
          withCredentials: true,
        });

        if (response.data.success) {
          setEquipments(response.data.data);
        } else {
          console.error("Failed to fetch equipments:", response.data.message);
          setEquipments([]);
        }
      } catch (error) {
        console.error("Error fetching equipments:", error);
        setEquipments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipments();
  }, [user]);

  // Conditionally render AdminEquipmentPage if user is Admin
  if (user?.role === 'Admin') {
    return <AdminEquipmentPage />;
  }

  // Default rendering for Farmer and others
  return (
    <>
      <Navbar />
      <div className="px-4 py-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-center">Available Equipments</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : user?.role !== 'Farmer' ? (
          <p className="text-center text-red-600">You must be a farmer to view equipments.</p>
        ) : equipments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipments.map((equipment) => (
              <Equipment key={equipment._id} equipment={equipment} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No equipment found.</p>
        )}
      </div>
    </>
  );
};


export default HomePage;
