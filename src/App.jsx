import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Reportes from "./pages/Reportes/Reportes";
import Inventario from "./pages/Inventario/Inventario";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Reportes" element={<Reportes/>} />
        <Route path="/Inventario" element={<Inventario />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;