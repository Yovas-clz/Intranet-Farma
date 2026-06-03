function Sidebar() {
  return (
    <div className="bg-dark text-white p-3" style={{ width: "250px", height: "100vh" }}>
      <h4>100% Farma</h4>
      <hr />

      <ul className="nav flex-column">
        <li className="nav-item">Dashboard</li>
        <li className="nav-item">Reportes</li>
        <li className="nav-item">Inventario</li>
        <li className="nav-item">Estadisticas</li>
        <li className="nav-item">Encuestas</li>
        <li className="nav-item">Sucursales</li>
    
    
        <li className="nav-item">Evidencias</li>
        <hr />
        <li className="nav-item">Cerrar sesión</li>
      </ul>
    </div>
  );
}

export default Sidebar;