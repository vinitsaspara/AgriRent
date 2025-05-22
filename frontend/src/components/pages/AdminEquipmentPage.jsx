import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Navbar } from './Navbar';
import Equipment from './Equipment';
import { EQUIPMENT_API_END_POINT } from '@/utils/constant.js';

const initialFormState = {
  name: '',
  type: '',
  serialNumber: '',
  description: '',
  rentPerHour: '',
  state: '',
  district: '',
  taluka: '',
  currentAssignedTo: '',  
  assignedRole: '',
  availabilityStatus: '',
  quantity: '',
  image: '',
};

const AdminEquipmentPage = () => {
  const { user } = useSelector((state) => state.user);
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.role !== 'Admin') {
      setLoading(false);
      return;
    }
    fetchEquipments();
  }, [user]);

  const fetchEquipments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${EQUIPMENT_API_END_POINT}/get-all-equipment`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setEquipments(response.data.data);
      } else {
        setEquipments([]);
        setError(response.data.message || 'Failed to fetch equipments');
      }
    } catch (err) {
      setEquipments([]);
      setError(err.message || 'Error fetching equipments');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add or Update equipment
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

   
    for (const key of Object.keys(initialFormState)) {
      if (!formData[key]) {
        setError(`Field "${key}" is required.`);
        return;
      }
    }

    try {
      if (isEditing && editingId) {
        
        const response = await axios.put(
          `${EQUIPMENT_API_END_POINT}/update-equipment/${editingId}`,
          formData,
          { withCredentials: true }
        );
        if (response.data.success) {
          // Update local list
          setEquipments((prev) =>
            prev.map((eq) => (eq._id === editingId ? response.data.data : eq))
          );
          resetForm();
        } else {
          setError(response.data.message || 'Failed to update equipment');
        }
      } else {
        // Add new equipment
        const response = await axios.post(
          `${EQUIPMENT_API_END_POINT}/add-equipment`,
          formData,
          { withCredentials: true }
        );
        if (response.data.success) {
          setEquipments((prev) => [response.data.data, ...prev]);
          resetForm();
        } else {
          setError(response.data.message || 'Failed to add equipment');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Server error');
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setIsEditing(false);
    setEditingId(null);
    setError('');
  };

  const handleEdit = (equipment) => {
    setFormData({
      name: equipment.name || '',
      type: equipment.type || '',
      serialNumber: equipment.serialNumber || '',
      description: equipment.description || '',
      rentPerHour: equipment.rentPerHour || '',
      state: equipment.state || '',
      district: equipment.district || '',
      taluka: equipment.taluka || '',
      currentAssignedTo: equipment.currentAssignedTo?._id || '',
      assignedRole: equipment.assignedRole || '',
      availabilityStatus: equipment.availabilityStatus || '',
      quantity: equipment.quantity || '',
      image: equipment.image || '',
    });
    setIsEditing(true);
    setEditingId(equipment._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this equipment?')) return;

    try {
      const response = await axios.delete(`${EQUIPMENT_API_END_POINT}/delete-equipment/${id}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setEquipments((prev) => prev.filter((eq) => eq._id !== id));
      } else {
        alert(response.data.message || 'Failed to delete equipment');
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Server error');
    }
  };

  if (!user) {
    return <p className="text-center py-6 text-gray-600">Loading user info...</p>;
  }

  if (user.role !== 'Admin') {
    return (
      <>
        <Navbar />
        <div className="px-4 py-6 min-h-screen bg-gray-100 flex items-center justify-center">
          <p className="text-red-600 text-lg">You do not have permission to view this page.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="px-4 py-6 bg-gray-100 min-h-screen max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {isEditing ? 'Edit Equipment' : 'Add New Equipment'}
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md mb-10 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {[
            { label: 'Name', name: 'name', type: 'text' },
            { label: 'Type', name: 'type', type: 'text' },
            { label: 'Serial Number', name: 'serialNumber', type: 'text' },
            { label: 'Description', name: 'description', type: 'text' },
            { label: 'Rent Per Hour (₹)', name: 'rentPerHour', type: 'number' },
            { label: 'State', name: 'state', type: 'text' },
            { label: 'District', name: 'district', type: 'text' },
            { label: 'Taluka', name: 'taluka', type: 'text' },
            { label: 'Current Assigned To (user ID)', name: 'currentAssignedTo', type: 'text' },
            { label: 'Assigned Role', name: 'assignedRole', type: 'text' },
            { label: 'Availability Status', name: 'availabilityStatus', type: 'text' },
            { label: 'Quantity', name: 'quantity', type: 'number' },
            { label: 'Image URL', name: 'image', type: 'text' },
          ].map(({ label, name, type }) => (
            <div key={name} className="flex flex-col">
              <label htmlFor={name} className="font-semibold mb-1">
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2"
                required
                min={type === 'number' ? 0 : undefined}
              />
            </div>
          ))}

          <div className="md:col-span-2 flex justify-between mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              {isEditing ? 'Update Equipment' : 'Add Equipment'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <h2 className="text-2xl font-bold mb-4 text-center">Manage Equipments (Admin)</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading equipments...</p>
        ) : equipments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipments.map((equipment) => (
              <div key={equipment._id} className="relative group">
                <Equipment equipment={equipment} />

                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex gap-2">
                  <button
                    onClick={() => handleEdit(equipment)}
                    className="bg-yellow-400 px-3 py-1 rounded shadow hover:bg-yellow-500"
                    title="Edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(equipment._id)}
                    className="bg-red-600 px-3 py-1 rounded shadow hover:bg-red-700 text-white"
                    title="Delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No equipment found.</p>
        )}
      </div>
    </>
  );
};

export default AdminEquipmentPage;
