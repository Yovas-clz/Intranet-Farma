import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Reportes from "./pages/Reportes/Reportes";
import Inventario from "./pages/Inventario/Inventario";
import Sucursales from "./pages/Sucursales/Sucursales";
import Evidencias from "./pages/Evidencias/Evidencias";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Reportes" element={<Reportes/>} />
        <Route path="/Inventario" element={<Inventario />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Sucursales" element={<Sucursales />} />
        <Route path="/Evidencias" element={<Evidencias />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;