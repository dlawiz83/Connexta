import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

function Layout() {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/contacts":
        return "Contacts";

      case "/settings":
        return "Settings";
      default:
        return "";
    }
  };

  return (
    <div className="flex h-screen">
      <div className="border-r border-gray-300">
        <Sidebar />
      </div>

      <main className="flex-1 bg-gray-50 flex flex-col">
        <TopBar title={getTitle()} />

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
