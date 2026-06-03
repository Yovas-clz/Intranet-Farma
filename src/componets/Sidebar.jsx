import "../styles/global.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <img src="/logo.png" alt="logo" style={{ width: "130px" }} />
      <hr />
      <ul className="mt-4 list-unstyled">

        <li className="sidebar-item sidebar-active">🏠 Inicio</li>
        <li className="sidebar-item">📄 Reportes</li>
        <li className="sidebar-item">🛒 Inventario</li>
        <li className="sidebar-item">📊 Estadísticas</li>
        <li className="sidebar-item">📋 Encuestas</li>
        <li className="sidebar-item">📝 Formulario</li>
        <li className="sidebar-item">🏢 Sucursales</li>
        
        
        <li className="sidebar-item">📎 Evidencias</li>

      </ul>
      <hr />
      <div className="mt-auto">
        <small style={{ cursor: "pointer" }}>Cerrar sesión</small>
      </div>
    </div>
  );
}

export default Sidebar;