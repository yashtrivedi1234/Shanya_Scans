import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import ScanTest from "./pages/scan/ScanTest";
import Login from "./pages/admin/Login";
import ProtectedAuth from "./pages/admin/ProtectedAuth";

// In your index.js or App.js
import 'leaflet/dist/leaflet.css';



function App() {
  return (
    <Routes>
      {/* Private Routes (Requires Login) */}
      <Route element={<ProtectedAuth isPrivate={true} />}>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/dashboard/scan/test/:slug" element={<ScanTest />} />
        <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      </Route>

      {/* Public Routes (Only when NOT logged in) */}
      <Route element={<ProtectedAuth isPrivate={false} />}>
        <Route path="/" element={<Login />} />
        <Route path="/auth/*" element={<Auth />} />
      </Route>
    </Routes>
  );
}

export default App;
