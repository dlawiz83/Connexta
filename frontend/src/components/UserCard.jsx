import { LogOut } from "lucide-react";

function UserCard({ user, onSignOut }) {
  return (
    <div className="flex flex-col m-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-black text-white font-medium">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-[13px]">{user.name}</span>
          <span className="text-[13px] text-gray-500">{user.email}</span>
        </div>
      </div>
      {/*button */}

      <button
        className="w-[90%] px-3 py-2 flex items-center gap-1 text-gray-500 rounded hover:bg-gray-300 hover:text-black text-[13px] mt-2"
        onClick={onSignOut}
      >
        <LogOut className="w-4 h-4" />
        Sign out
      </button>
    </div>
  );
}

export default UserCard;
