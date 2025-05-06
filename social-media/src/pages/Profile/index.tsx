"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";

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
    
      toast.success("Profile updated successfully!");
      setEditMode(false);
      setOriginalForm(form);
    } catch (error) {
      console.error("Error updating profile", error);
      toast.error("Failed to update profile.");
    }
    
  };

  const isFormChanged = JSON.stringify(form) !== JSON.stringify(originalForm);

  if (status === "loading" || loading) return <p>Loading...</p>;

  const initials = `${form.first_name?.[0] || ""}${form.last_name?.[0] || ""}`;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-2xl relative border border-gray-200">
      <button
        onClick={handleEditToggle}
        className="absolute top-6 right-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow"
      >
        {editMode ? "Cancel" : "Edit"}
      </button>

      <div className="flex flex-col items-center">
        <div className="w-28 h-28 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-3xl font-bold mb-4 shadow">
          {initials}
        </div>
        <h2 className="text-2xl font-semibold">{form.first_name} {form.last_name}</h2>
        <p className="text-gray-500">{form.email}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={!editMode}
          />
          <input
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!editMode}
          />
        </div>

        <input
          name="phone_number"
          value={form.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={!editMode}
        />

        <input
          type="date"
          name="DOB"
          value={form.DOB}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!editMode}
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="w-full p-3 border rounded-lg bg-gray-100 text-gray-500"
          disabled
        />

        {editMode && isFormChanged && (
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        )}
      </form>
    </div>
  );
}
