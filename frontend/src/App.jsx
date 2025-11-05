import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/contacts" element={<Contacts />} />

        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
