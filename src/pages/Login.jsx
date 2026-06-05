import { useNavigate } from "react-router-dom";
import "../styles/global.css";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center login-container">

      <img
        src="/preview.png"
        alt="logo"
        style={{ width: "120px" }}
        className="position-absolute top-0 start-0 m-3"
      />

      <div className="login-logo-circle mb-4">
        <img src="/preview.png" alt="logo" style={{ width: "150px" }} />
      </div>

      <form onSubmit={handleLogin} className="login-form">

        <label>Usuario</label>
        <input className="form-control rounded-input mb-3" placeholder="USUARIO@ejemplo" />

        <label>Contraseña</label>
        <input type="password" className="form-control rounded-input mb-4" placeholder="********" />

        <button className="btn btn-primary-custom w-100">
          INICIAR SESIÓN
        </button>

      </form>

    </div>
  );
}

export default Login;