import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Pipeline from "./pages/Pipeline";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      {/*Routes */}
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
