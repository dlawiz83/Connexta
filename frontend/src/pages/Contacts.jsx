import { useState, useEffect } from "react";
import { Search, Plus, ChevronDown, UserPlus } from "lucide-react";
import AddContactModal from "../components/AddContactModal";

const getStageColor = (stage) => {
  const colors = {
    Prospect: "bg-blue-100 text-blue-800",
    "Reached Out": "bg-yellow-100 text-yellow-800",
    "Chat Scheduled": "bg-purple-100 text-purple-800",
    Interviewing: "bg-green-100 text-green-800",
    Referred: "bg-teal-100 text-teal-800",
  };
  return colors[stage] || "bg-gray-100 text-gray-800";
};

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

  //  Fetch contacts on load
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("https://connexta.onrender.com/api/contacts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load contacts");
        setContacts(data);
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };
    fetchContacts();
  }, []);

  //  When modal saves a new contact, just update state (no double POST)
  const handleContactSaved = (createdContact) => {
    setContacts((prev) => [...prev, createdContact]);
    setShowModal(false);
  };

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === "all" || contact.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const stages = Array.from(new Set(contacts.map((c) => c.stage)));

  return (
    <div className="space-y-6">
      {/* Header + Filters */}
      <div className="bg-white border rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-lg font-semibold">Contacts</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Stage Filter */}
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm w-full sm:w-48 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Stages</option>
            {stages.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>

          {/* Add Contact Button */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              <Plus size={16} />
              Add Contact
              <ChevronDown size={16} />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md z-10">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    setShowModal(true);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100"
                >
                  <UserPlus size={14} /> Add Single Contact
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Contacts Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b bg-gray-50 text-left">
                <th className="px-4 py-2 font-medium text-gray-700">Name</th>
                <th className="px-4 py-2 font-medium text-gray-700">Company</th>
                <th className="px-4 py-2 font-medium text-gray-700">Title</th>
                <th className="px-4 py-2 font-medium text-gray-700">Stage</th>
                <th className="px-4 py-2 font-medium text-gray-700">
                  Last Interaction
                </th>
                <th className="px-4 py-2 font-medium text-gray-700">
                  Next Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr key={contact._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-gray-500 text-xs">
                        {contact.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{contact.company}</td>
                  <td className="px-4 py-3">{contact.title}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStageColor(
                        contact.stage
                      )}`}
                    >
                      {contact.stage}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {contact.lastInteractionAt
                      ? new Date(contact.lastInteractionAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {contact.nextActionAt
                      ? new Date(contact.nextActionAt).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No contacts found matching your filters.
          </div>
        )}
      </div>

      {/*  Add Modal */}
      {showModal && (
        <AddContactModal
          onClose={() => setShowModal(false)}
          onSave={handleContactSaved}
        />
      )}
    </div>
  );
}
