import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className=" flex h-screen">
      <Sidebar />
      <main className="lex-1 bg-gray-50 p-6 overflow-y-auto"></main>
      <Outlet />
    </div>
  );
}

export default Layout;
