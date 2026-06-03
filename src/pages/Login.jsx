import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form className="p-4 shadow bg-white rounded" onSubmit={handleLogin}>
        <h3 className="text-center mb-3">100% Farma</h3>

        <input
        type="text"
        placeholder="Usuario"
        className="form-control mb-3"
        />

        <input
        type="password"
        placeholder="Contraseña"
        className="form-control mb-3"
        />

        <button className="btn btn-primary w-100">Entrar</button>
      </form>
    </div>
  );
}

export default Login;