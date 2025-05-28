import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Button } from "../ui/button";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import toast from "react-hot-toast";
import { setUser } from "@/redux/slices/userSlice";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    address: user?.address || "",
    age: user?.age || "",
    phoneNumber: user?.phoneNumber || "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user?.profilePicture || "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });
      if (profileImage) {
        form.append("file", profileImage);
      }

      const res = await axios.put(
        `${USER_API_END_POINT}/update-user-profile`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/user/profile");
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("profile is not updated");
    }
  };

  if (!user)
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center text-center py-12 px-4">
          <div className="bg-white p-8 rounded-xl shadow-2xl">
            <p className="text-xl text-emerald-800 mb-6">
              Please log in to view your profile.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="py-3 px-6 text-white bg-emerald-600 hover:bg-emerald-700 rounded-md font-semibold transition duration-300"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-2xl">
          <h2 className="text-2xl font-bold text-emerald-800 mb-6 text-center">
            Edit Profile
          </h2>

          <div className="space-y-6">
            {/* Profile picture preview and upload */}
            <div className="flex flex-col items-center space-y-2">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover"
                />
              )}
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {[
              { label: "Full Name", name: "fullName" },
              { label: "Email", name: "email" },
              { label: "Address", name: "address" },
              { label: "Age", name: "age", type: "number" },
              { label: "Phone Number", name: "phoneNumber" },
            ].map(({ label, name, type = "text" }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-emerald-700">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 border rounded-md bg-emerald-50 text-gray-800"
                />
              </div>
            ))}

            <Button className="w-full cursor-pointer" onClick={handleUpdate}>
              Update Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
