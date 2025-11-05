import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Button from "./Button";
import ScheduleActionModal from "../components/ScheduleActionModal";

export default function NextActionsCard() {
  const [actions, setActions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;
  const colors = {
    Prospect: "bg-blue-100 text-blue-800",
    "Reached Out": "bg-yellow-100 text-yellow-800",
    "Chat Scheduled": "bg-purple-100 text-purple-800",
    Interviewing: "bg-green-100 text-green-800",
    Referred: "bg-teal-100 text-teal-800",
  };

  const fetchActions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in again.");
        return;
      }

      const res = await fetch(`${API_URL}/api/next-actions?days=7`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch actions");
      setActions(data);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActions();
  }, []);

  return (
    <div className="bg-white w-full h-auto rounded-xl border relative">
      {/* Header */}
      <div className="m-6 flex flex-row items-center justify-between">
        <div>
          <h1 className="text-[14px] font-medium">Upcoming Next Actions</h1>
          <p className="text-gray-500 text-[14px]">
            Follow-ups and tasks that need your attention
          </p>
        </div>
        <Button width="w-28" height="h-10" onClick={() => setOpenModal(true)}>
          <Plus size={14} /> Add Action
        </Button>
      </div>

      {/* Table */}
      <div className="m-6">
        {loading ? (
          <p className="text-gray-500 text-sm">Loading actions...</p>
        ) : actions.length === 0 ? (
          <p className="text-gray-500 text-sm">No upcoming actions found.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="px-6 py-3 text-left border-b">
                <th className="px-4 py-2 text-[13px] font-medium text-gray-800">
                  Contact
                </th>
                <th className="px-4 py-2 text-[13px] font-medium text-gray-800">
                  Stage
                </th>
                <th className="px-4 py-2 text-[13px] font-medium text-gray-800">
                  Next Action
                </th>
                <th className="px-4 py-2 text-[13px] font-medium text-gray-800">
                  Due Date
                </th>
                <th className="px-4 py-2 text-[13px] font-medium text-gray-800">
                  Last Contact
                </th>
              </tr>
            </thead>
            <tbody>
              {actions.map((item) => (
                <tr key={item.contactId} className="border-b">
                  <td className="px-4 py-2 text-[13px]">
                    <div className="flex flex-col">
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-[13px]">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        colors[item.stage] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.stage}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-[13px] text-gray-700 capitalize">
                    {item.type || "-"}
                  </td>
                  <td className="px-4 py-2 text-[13px]">
                    {item.nextActionAt
                      ? new Date(item.nextActionAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-2 text-[13px] text-gray-500">
                    {item.lastInteractionAt
                      ? new Date(item.lastInteractionAt).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {openModal && (
        <ScheduleActionModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          onActionCreated={fetchActions}
        />
      )}
    </div>
  );
}
