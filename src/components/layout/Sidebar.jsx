import { useNavigate } from "react-router-dom";
import "../../styles/sidebar.css";

function Sidebar({ active }) {
  const navigate = useNavigate();

  return (
    <div className="sidebar">

      <div>
        <img src="preview.png"
        alt="logo"
        style={{width: "200px"}} 
        />

        <nav className="menu">

          <button
            className={`sidebar-item ${active === "dashboard" ? "sidebar-active" : ""}`}
            onClick={() => navigate("/Dashboard")}
          >
            ⁝⁝ Dashboard
          </button>

          <button
            className={`sidebar-item ${active === "reportes" ? "sidebar-active" : ""}`}
            onClick={() => navigate("/Reportes")}
          >
            📄 Reportes
          </button>

          <button
            className={`sidebar-item ${active === "inventario" ? "sidebar-active" : ""}`}
            onClick={() => navigate("/Inventario")}
          >
            🛒 Inventario
          </button>

          <button className="sidebar-item">
            📈 Estadísticas 
          </button>

          <button
            className={`sidebar-item ${active === "encuesta" ? "sidebar-active" : ""}`}
            onClick={() => navigate("/Encuesta")}
          >
            📊 Encuestas
          </button>

          <button
            className="sidebar-item"
            onClick={() => navigate("/Sucursales")}
          >
            🏠 Sucursales
          </button>

          <button
            className="sidebar-item"
            onClick={() => navigate("/Evidencias")}
          >
            📑 Evidencias
          </button>

        </nav>
      </div>

      <div className="logout">
        <button onClick={() => navigate("/")}>
          🚪 Cerrar sesión
        </button>
      </div>

    </div>
  );
}

export default Sidebar;