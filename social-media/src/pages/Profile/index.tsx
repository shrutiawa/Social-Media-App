"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Profile() {
  const { data: session, status } = useSession();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    gender: "",
    DOB: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [originalForm, setOriginalForm] = useState({ ...form });

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetchProfile();
    }
  }, [status, session?.user?.email]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/api/auth/profile/route");
      const data = res.data;

      const formattedDOB = data.DOB ? data.DOB.split("T")[0] : "";

      setForm({ ...data, DOB: formattedDOB });
      setOriginalForm({ ...data, DOB: formattedDOB });
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
    setForm(originalForm);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axios.put("/api/auth/profile/route", form, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Profile updated successfully!");
      setEditMode(false);
      setOriginalForm(form);
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const isFormChanged = JSON.stringify(form) !== JSON.stringify(originalForm);

  if (status === "loading" || loading) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-lg bg-white relative">
      <button
        onClick={handleEditToggle}
        className="absolute top-4 right-4 px-3 py-1 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        {editMode ? "Cancel" : "Edit"}
      </button>

      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gray-300 mb-3"></div>
        <h2 className="text-xl font-bold">{form.first_name} {form.last_name}</h2>
        <p className="text-gray-500">{form.email}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full p-2 border rounded"
          required
          disabled={!editMode}
        />
        <input
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full p-2 border rounded"
          disabled={!editMode}
        />
        <input
          name="phone_number"
          value={form.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
          required
          disabled={!editMode}
        />
        <input
          type="date"
          name="DOB"
          value={form.DOB}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={!editMode}
        />
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={!editMode}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          name="email"
          value={form.email}
          className="w-full p-2 border rounded bg-gray-100"
          disabled
        />

        {editMode && isFormChanged && (
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        )}
      </form>
    </div>
  );
}
