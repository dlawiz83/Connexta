import { useState } from "react";
import { User, Lock, X } from "lucide-react";

export default function Settings() {
  const [profile, setProfile] = useState({
    name: "Ayesha Dawodi",
    email: "ayesha@example.com",
  });
  const [saved, setSaved] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setShowPasswordModal(false);
    alert("Password updated successfully!");
  };

  return (
    <div className="p-4 text-black">
      <div className="space-y-4 max-w-md mx-auto">
        {/* Profile */}
        <section className="border rounded-lg p-4">
          <h2 className="font-semibold text-base flex items-center gap-2 mb-2">
            <User className="w-4 h-4" /> Profile
          </h2>
          <div className="space-y-2 text-sm">
            <div>
              <label className="block text-gray-600">Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                className="w-full border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                className="w-full border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
          </div>
          <button
            onClick={handleSave}
            className="mt-3 w-full border text-sm py-1 rounded-md hover:bg-black hover:text-white transition"
          >
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </section>

        {/* Security */}
        <section className="border rounded-lg p-4">
          <h2 className="font-semibold text-base flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4" /> Security
          </h2>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="text-sm border rounded-md px-3 py-1 hover:bg-black hover:text-white transition"
          >
            Change Password
          </button>
        </section>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-5 w-80 relative shadow-lg">
            <button
              onClick={() => setShowPasswordModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              <X size={16} />
            </button>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Lock className="w-4 h-4" /> Change Password
            </h3>
            <form onSubmit={handlePasswordChange} className="space-y-2 text-sm">
              <div>
                <label className="block text-gray-600">Current Password</label>
                <input
                  type="password"
                  required
                  className="w-full border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  value={passwords.current}
                  onChange={(e) =>
                    setPasswords({ ...passwords, current: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-600">New Password</label>
                <input
                  type="password"
                  required
                  className="w-full border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  value={passwords.newPass}
                  onChange={(e) =>
                    setPasswords({ ...passwords, newPass: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-600">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  className="w-full border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords({ ...passwords, confirm: e.target.value })
                  }
                />
              </div>
              <button
                type="submit"
                className="w-full mt-3 border rounded-md py-1 hover:bg-black hover:text-white transition"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
