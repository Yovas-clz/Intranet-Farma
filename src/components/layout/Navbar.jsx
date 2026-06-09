import { useState, useRef } from "react";
import "../../styles/navbar.css";

function Navbar({ title }) {
  const [notificaciones, setNotificaciones] = useState(3);
  const [foto, setFoto] = useState("https://via.placeholder.com/32");

  const inputRef = useRef();

  const cambiarFoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(URL.createObjectURL(file));
    }
  };

  return (
    <div className="navbar">

      <div className="nav-left">
        <span className="line"></span>
        <span className="title">{title}</span>
      </div>

      <div className="nav-search">
        <input placeholder="Buscar aquí..." />
      </div>

      <div className="nav-right">

        <div className="bell" onClick={() => setNotificaciones(0)}>
          🔔
          {notificaciones > 0 && (
            <span className="badge">{notificaciones}</span>
          )}
        </div>

        <input
          type="file"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={cambiarFoto}
        />

        <div className="profile" onClick={() => inputRef.current.click()}>
          <img src={foto} />
          <div>
            <span>Usuario</span>
            <small>Admin</small>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Navbar;