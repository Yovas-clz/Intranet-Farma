import "../styles/global.css";

function Navbar() {
  return (
    <div className="navbar-custom d-flex justify-content-between align-items-center px-4">

      <strong>Inicio</strong>

      <input className="search-bar" placeholder="Buscar aquí..." />

      <div className="d-flex align-items-center">
        <span className="me-3">🔔</span>

        <img
          src="/user.png"
          alt="user"
          style={{ width: "35px", borderRadius: "50%" }}
        />

        <div className="ms-2">
          <div style={{ fontSize: "12px" }}>Zuheidi M</div>
          <div style={{ fontSize: "10px", color: "gray" }}>Admin</div>
        </div>
      </div>

    </div>
  );
}

export default Navbar;