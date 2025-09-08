import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Kanban, Settings } from "lucide-react";
import Usercard from "./UserCard";

function Sidebar() {
  const location = useLocation();
  const dummyUser = {
    name: "Ayesha",
    email: "ayesha@gmail.com",
  };
  const onSignOut = () => {
    alert("sign out");
  };
  return (
    <>
      <aside className=" justify-between w-56  h-screen bg-white flex flex-col">
        <div>
          <div className="mt-4 ml-5 mb-2 mr-2 space-y-1">
            <p className="font-medium text-[14px] md:text-[17px] leading-7">
              Connect & Collaborate
            </p>
            <p className=" text-[#717182] px-1 text-[13px] ">
              Productivity Suite
            </p>
          </div>
          <hr className="border-gray-300 dark:border-gray-700" />

          <nav className=" flex flex-col space-y-4 mt-5 ml-5 text-[13px]  font-medium ">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 w-[90%] rounded px-3 py-2 ${
                  isActive ? "bg-gray-300" : "hover:bg-gray-300"
                }`
              }
            >
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </NavLink>
            <NavLink
              to="/contacts"
              className={({ isActive }) =>
                `flex items-center gap-2 w-[90%] rounded px-3 py-2 ${
                  isActive ? "bg-gray-300" : "hover:bg-gray-300"
                }`
              }
            >
              <Users className="w-4 h-4" />
              Contacts
            </NavLink>
            <NavLink
              to="/pipeline"
              className={({ isActive }) =>
                `flex items-center gap-2 w-[90%] rounded px-3 py-2 ${
                  isActive ? "bg-gray-300" : "hover:bg-gray-300"
                }`
              }
            >
              <Kanban className="w-4 h-4" />
              Pipeline
            </NavLink>
            <NavLink
              to="/settings"
              className="flex items-center w-[90%] gap-2  rounded px-3 py-2 hover:bg-gray-300"
            >
              <Settings className="w-4 h-4" />
              Settings
            </NavLink>
          </nav>
        </div>
        <hr className="border-gray-300 dark:border-gray-700 mt-72 " />
        {(location.pathname === "/" || location.pathname === "/contacts") && (
          <Usercard user={dummyUser} onSignOut={onSignOut} />
        )}
      </aside>
    </>
  );
}

export default Sidebar;
