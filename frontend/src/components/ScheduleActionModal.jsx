import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function ScheduleActionModal({
  isOpen,
  onClose,
  onActionCreated,
}) {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    contactId: "",
    type: "",
    contentSnippet: "",
    date: "",
    nextActionAt: "",
  });

  //  Fetch contacts for dropdown
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("https://connexta.onrender.com/api/contacts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (res.ok) setContacts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchContacts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://connexta.onrender.com/api/interactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create action");
      onActionCreated();
      onClose();
      alert("Action scheduled successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-semibold">Schedule Next Action</h2>
          <button onClick={onClose}>
            <X size={18} className="text-gray-500 hover:text-gray-800" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Contact *
            </label>
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
          </div>

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
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="contentSnippet"
              value={form.contentSnippet}
              onChange={handleChange}
              placeholder="Add details..."
              rows={3}
              className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm resize-none"
            />
          </div>

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
