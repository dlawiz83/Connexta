import { useState } from "react";

export default function AddContactModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    title: "",
    stage: "Prospect",
    lastInteractionAt: "",
    nextActionAt: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      name: form.name,
      email: form.email,
      company: form.company,
      title: form.title,
      stage: form.stage,
      lastInteractionAt: form.lastInteractionAt || null,
      nextActionAt: form.nextActionAt || null,
    };

    try {
      const res = await fetch("https://connexta.onrender.com/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Important
        },
        body: JSON.stringify(formattedData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Failed to add contact");

      onSave(data); // Pass created contact to parent
      onClose();
      alert("Contact added successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-lg font-semibold mb-4">Add New Contact</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">Company</label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700">Stage</label>
              <select
                name="stage"
                value={form.stage}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
              >
                <option>Prospect</option>
                <option>Reached Out</option>
                <option>Chat Scheduled</option>
                <option>Interviewing</option>
                <option>Referred</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-700">Next Action Date</label>
              <input
                name="nextActionAt"
                type="date"
                value={form.nextActionAt}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-700">
              Last Interaction Date
            </label>
            <input
              name="lastInteractionAt"
              type="date"
              value={form.lastInteractionAt}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800"
            >
              Save Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
