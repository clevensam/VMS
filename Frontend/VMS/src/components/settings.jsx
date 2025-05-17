import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa';

const Settings = () => {
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Faculty',
    phone: '+1 234 567 8901',
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 space-y-4">
      {/* Avatar with edit */}
      <div className="flex justify-center">
        <div className="relative group w-28 h-28">
          <img
            src={
              preview ||
              'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff'
            }
            alt="Profile"
            className="rounded-full object-cover w-full h-full border-4 border-blue-500 shadow"
          />
          <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
            <FaCamera className="text-white text-lg" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* User Info */}
      <div className="text-center space-y-1">
        <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
        <p className="text-sm text-gray-500">{user.role}</p>
      </div>

      <div className="text-sm text-gray-600 space-y-1 text-center">
        <p>{user.email}</p>
        <p>{user.phone}</p>
      </div>

      {/* Update Button */}
      {preview && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => alert('Picture updated!')}
            className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-blue-700 transition"
          >
            Save New Picture
          </button>
        </div>
      )}
    </div>
  );
};

export default Settings;
