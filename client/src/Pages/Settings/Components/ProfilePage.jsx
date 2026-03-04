import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { updateProfile } from "../../../api/auth.api";
import { useAuth } from "../../../context/AuthContext";

function ProfilePage() {

  const { user, setUser } = useAuth();

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    date_of_birth: "",
    phone: "",
    bio: "",
  });

  useEffect(() => {
    if (!user) return;

    setFormData({
      name: user.name || "",
      gender: user.gender || "",
      date_of_birth: user.date_of_birth
        ? user.date_of_birth.split("T")[0]
        : "",
      phone: user.phone || "",
      bio: user.bio || "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await updateProfile(formData);

      setUser(res.data); // update context user
      setEditMode(false);

    } catch (error) {
      console.error("Update failed", error);
    }
  };

  if (!user) return <p className="p-10">Loading profile...</p>;

  const initial = user.name?.charAt(0).toUpperCase();

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto bg-white shadow rounded-xl">

          {/* Header */}
          <div className="h-28 bg-gradient-to-r from-blue-200 to-yellow-100"></div>

          {/* Avatar */}
          <div className="flex justify-between items-center px-8 -mt-10">

            <div className="flex items-center gap-4">
              {user.profile_picture ? (
                <img
                  src={user.profile_picture}
                  alt="profile"
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold">
                  {initial}
                </div>
              )}

              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
            </div>

            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            )}

          </div>

          {/* Form */}
          <div className="p-8 grid grid-cols-2 gap-6">

            <div>
              <label className="text-sm text-gray-500">Full Name</label>
              <input
                name="name"
                value={formData.name}
                disabled={!editMode}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                disabled={!editMode}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-500">Date of Birth</label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                disabled={!editMode}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Phone</label>
              <input
                name="phone"
                value={formData.phone}
                disabled={!editMode}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm text-gray-500">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                disabled={!editMode}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ProfilePage;