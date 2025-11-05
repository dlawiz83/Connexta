import { useState, useContext } from "react";
import { User, Lock, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function Settings() {
  const { user, updateUser } = useContext(AuthContext);

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [saved, setSaved] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const handleSave = async () => {
    try {
      const res = await fetch(
        "https://connexta.onrender.com/api/auth/update-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ name: profile.name, email: profile.email }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Update failed");
      updateUser({ name: profile.name });

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      alert("Profile updated successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwords.newPass !== passwords.confirm) {
      alert("New passwords do not match!");
      return;
    }

    try {
      const res = await fetch(
        "https://connexta.onrender.com/api/auth/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            currentPassword: passwords.current,
            newPassword: passwords.newPass,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Failed to change password");

      alert("Password updated successfully!");
      setShowPasswordModal(false);
      setPasswords({ current: "", newPass: "", confirm: "" });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-6 text-black min-h-screen bg-gray-50">
      <div className="space-y-6 max-w-md mx-auto">
        {/* Profile Section */}
        <section className="border bg-white rounded-xl shadow-sm p-5">
          <h2 className="font-semibold text-base flex items-center gap-2 mb-4">
            <User className="w-4 h-4" /> Profile
          </h2>

          <div className="space-y-3 text-sm">
            <div>
              <label className="block text-gray-600">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black bg-gray-50"
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
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black bg-gray-50"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">
                Email cannot be changed
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            className={`mt-4 w-full border text-sm py-2 rounded-md transition ${
              saved
                ? "bg-green-500 text-white border-green-500"
                : "hover:bg-black hover:text-white"
            }`}
          >
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </section>

        {/* Security Section */}
        <section className="border bg-white rounded-xl shadow-sm p-5">
          <h2 className="font-semibold text-base flex items-center gap-2 mb-4">
            <Lock className="w-4 h-4" /> Security
          </h2>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="text-sm border rounded-md px-4 py-2 hover:bg-black hover:text-white transition"
          >
            Change Password
          </button>
        </section>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-5 w-80 relative shadow-lg">
            <button
              onClick={() => setShowPasswordModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              <X size={16} />
            </button>

            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Lock className="w-4 h-4" /> Change Password
            </h3>

            <form onSubmit={handlePasswordChange} className="space-y-3 text-sm">
              <div>
                <label className="block text-gray-600">Current Password</label>
                <input
                  type="password"
                  required
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
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
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
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
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords({ ...passwords, confirm: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 border rounded-md py-2 hover:bg-black hover:text-white transition"
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
