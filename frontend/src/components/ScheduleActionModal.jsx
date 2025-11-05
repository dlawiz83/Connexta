import { X } from "lucide-react";

export default function ScheduleActionModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-semibold">Schedule Next Action</h2>
            <p className="text-sm text-gray-500">
              Create a follow-up task or reminder for one of your contacts.
            </p>
          </div>
          <button onClick={onClose}>
            <X size={18} className="text-gray-500 hover:text-gray-800" />
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Contact */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Contact *
            </label>
            <select className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500">
              <option>Select a contact</option>
            </select>
          </div>

          {/* Action Type + Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Action Type *
              </label>
              <select className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm">
                <option>Send Email</option>
                <option>Call</option>
                <option>Message</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Priority
              </label>
              <select className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm">
                <option>High Priority</option>
                <option>Medium Priority</option>
                <option>Low Priority</option>
              </select>
            </div>
          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Due Date *
              </label>
              <input
                type="date"
                className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Due Time
              </label>
              <input
                type="time"
                className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm"
              />
            </div>
          </div>

          {/* Action Title */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Action Title
            </label>
            <input
              type="text"
              placeholder="Send Email - Auto-generated if left blank"
              className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Add details about what needs to be done..."
              rows={3}
              className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm resize-none"
            />
          </div>

          {/* Reminder */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
              Reminder Settings
            </h3>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="reminder" defaultChecked />
              <label htmlFor="reminder" className="text-sm text-gray-700">
                Enable reminder
              </label>
            </div>
            <div className="mt-2">
              <label className="text-sm font-medium text-gray-700">
                Remind me
              </label>
              <select className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm">
                <option>1 day before</option>
                <option>2 days before</option>
                <option>1 hour before</option>
              </select>
            </div>
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
              Schedule Action
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
