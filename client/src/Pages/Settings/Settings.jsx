import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { updateProfile } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";

function Settings() {
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
      setUser(res.data.user);
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <p className="p-10">Loading...</p>;

  const initial = user.name?.charAt(0)?.toUpperCase();

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-8">

        {/* HERO SECTION */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
rounded-3xl p-8 text-white shadow-lg animate-gradient">

          <div className="flex items-center gap-6">

            {user.profile_picture ? (
              <img
                src={user.profile_picture}
                alt="profile"
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-white text-indigo-600 flex items-center justify-center text-3xl font-bold">
                {initial}
              </div>
            )}

            <div>
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="opacity-90">{user.email}</p>
            </div>

          </div>

        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-3 gap-6 mt-8">

          <div className="bg-white rounded-xl p-5 shadow">
            <p className="text-gray-500 text-sm">Interviews Taken</p>
            <h3 className="text-xl font-bold">12</h3>
          </div>

          <div className="bg-white rounded-xl p-5 shadow">
            <p className="text-gray-500 text-sm">Practice Sessions</p>
            <h3 className="text-xl font-bold">28</h3>
          </div>

          <div className="bg-white rounded-xl p-5 shadow">
            <p className="text-gray-500 text-sm">Profile Score</p>
            <h3 className="text-xl font-bold">85%</h3>
          </div>

        </div>

        {/* PROFILE FORM CARD */}
        <div className="bg-white rounded-2xl shadow p-8 mt-8">

          <div className="flex justify-between items-center mb-6">

            <h3 className="text-lg font-semibold">
              Profile Information
            </h3>

            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="bg-primary-light text-white px-5 py-2 rounded-lg hover:bg-primary-dark"
              >
                Edit
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-200 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="bg-primary-light text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
                >
                  Save
                </button>
              </div>
            )}

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="text-sm text-gray-500 block mb-1">
                Full Name
              </label>

              <input
                name="name"
                value={formData.name}
                disabled={!editMode}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring focus:ring-indigo-200 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500 block mb-1">
                Phone
              </label>

              <input
                name="phone"
                value={formData.phone}
                disabled={!editMode}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring focus:ring-indigo-200 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500 block mb-1">
                Gender
              </label>

              <select
                name="gender"
                value={formData.gender}
                disabled={!editMode}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring focus:ring-indigo-200 disabled:bg-gray-100"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-500 block mb-1">
                Date of Birth
              </label>

              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                disabled={!editMode}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring focus:ring-indigo-200 disabled:bg-gray-100"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-gray-500 block mb-1">
                Bio
              </label>

              <textarea
                name="bio"
                value={formData.bio}
                disabled={!editMode}
                onChange={handleChange}
                rows="4"
                className="w-full border rounded-lg p-3 focus:ring focus:ring-indigo-200 disabled:bg-gray-100"
              />
            </div>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}

export default Settings;