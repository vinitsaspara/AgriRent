import React from 'react';

const Equipment = ({ equipment }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      {equipment.image && (
        <img
          src={equipment.image}
          alt={equipment.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}
      <h2 className="text-xl font-semibold mb-2">{equipment.name}</h2>
      <p className="text-gray-600 mb-1"><strong>Type:</strong> {equipment.type}</p>
      <p className="text-gray-600 mb-1"><strong>Serial Number:</strong> {equipment.serialNumber}</p>
      <p className="text-gray-600 mb-1"><strong>Description:</strong> {equipment.description}</p>
      <p className="text-gray-600 mb-1"><strong>Rent/Hour:</strong> ₹{equipment.rentPerHour}</p>
      <p className="text-gray-600 mb-1"><strong>Quantity:</strong> {equipment.quantity}</p>
      <p className="text-gray-600 mb-1"><strong>Status:</strong> {equipment.availabilityStatus}</p>
      <p className="text-gray-600 mb-1"><strong>Assigned Role:</strong> {equipment.assignedRole}</p>
      <p className="text-gray-600 mb-1"><strong>Location:</strong> {equipment.state}, {equipment.district}, {equipment.taluka}</p>
    </div>
  );
};

export default Equipment;
