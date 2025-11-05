import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function ScheduleActionModal({
  isOpen,
  onClose,
  onActionCreated,
}) {
  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [form, setForm] = useState({
    contactId: "",
    type: "",
    nextActionSnippet: "",
    date: new Date().toISOString().split("T")[0],
    nextActionAt: "",
  });

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch contacts for dropdown
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please log in again.");
          return;
        }

        const res = await fetch(`${API_URL}/api/contacts`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load contacts");

        setContacts(data);
      } catch (err) {
        console.error("Error fetching contacts:", err);
        alert(err.message);
      } finally {
        setLoadingContacts(false);
      }
    };

    if (isOpen) fetchContacts();
  }, [isOpen, API_URL]);

  // Handle form changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in again.");
        return;
      }

      const res = await fetch(`${API_URL}/api/interactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to schedule action");

      alert("Action scheduled successfully!");
      onActionCreated?.();
      onClose();
    } catch (err) {
      console.error("Error scheduling action:", err);
      alert(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-lg animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-semibold">Schedule Next Action</h2>
          <button onClick={onClose}>
            <X size={18} className="text-gray-500 hover:text-gray-800" />
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Contact */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Contact *
            </label>
            {loadingContacts ? (
              <p className="text-sm text-gray-500 mt-1">Loading contacts...</p>
            ) : (
              <select
                name="contactId"
                value={form.contactId}
                onChange={handleChange}
                required
                className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm"
              >
                <option value="">Select contact</option>
                {contacts.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name} — {c.company}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Action Type */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Action Type *
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm"
            >
              <option value="">Select type</option>
              <option value="email">Email</option>
              <option value="call">Call</option>
              <option value="dm">DM</option>
              <option value="meeting">Meeting</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="nextActionSnippet"
              value={form.nextActionSnippet}
              onChange={handleChange}
              placeholder="Add details..."
              rows={3}
              className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm resize-none"
            />
          </div>

          {/* Interaction Date */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Interaction Date *
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm"
            />
          </div>

          {/* Next Action Date */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Next Action Date *
            </label>
            <input
              type="date"
              name="nextActionAt"
              value={form.nextActionAt}
              onChange={handleChange}
              required
              className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
