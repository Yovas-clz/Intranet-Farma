import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import "../../styles/reportes.css";

export default function Reportes() {
  const navigate = useNavigate();

  const [progreso, setProgreso] = useState(0);
  const [estaCargando, setEstaCargando] = useState(false);
  const fileInputRef = useRef(null);

  const [reportes, setReportes] = useState([
    { id: 1, nombre: "Reporte Ventas 2026.pdf", fecha: "2026-03-15", hora: "14:30", dia: "Viernes", seleccionado: false },
  ]);

  const [comentario, setComentario] = useState("");
  const [todosSeleccionados, setTodosSeleccionados] = useState(false);

  const controlarSubidaArchivo = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    setEstaCargando(true);
    setProgreso(0);

    let porcentaje = 0;

    const intervalo = setInterval(() => {
      porcentaje += 5;
      setProgreso(porcentaje);

      if (porcentaje >= 100) {
        clearInterval(intervalo);

        const ahora = new Date();

        const nuevoReporte = {
          id: Date.now(),
          nombre: archivo.name,
          fecha: ahora.toISOString().split("T")[0],
          hora: ahora.toTimeString().substring(0, 5),
          dia: "Hoy",
          seleccionado: false,
        };

        setReportes((prev) => [nuevoReporte, ...prev]);
        setEstaCargando(false);
      }
    }, 120);
  };

  const toggleSelectAll = () => {
    const nuevo = !todosSeleccionados;
    setTodosSeleccionados(nuevo);

    setReportes((prev) =>
      prev.map((r) => ({ ...r, seleccionado: nuevo }))
    );
  };

  const toggleSelect = (id) => {
    setReportes((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, seleccionado: !r.seleccionado } : r
      )
    );
  };

  const eliminarReporte = (id) => {
    setReportes((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="main-container">

      <Sidebar active="reportes" />

      <div className="content">
        <Navbar title="Reportes" />

        <h1 className="title">Gestión de Reportes</h1>

        {/* SUBIDA */}
        <div className="upload-box">
          <input
            type="file"
            ref={fileInputRef}
            onChange={controlarSubidaArchivo}
            hidden
          />

          <div
            className="drop-zone"
            onClick={() => !estaCargando && fileInputRef.current.click()}
          >
            <span className="icon">📤</span>
            <p>
              {estaCargando
                ? "Procesando archivo..."
                : "Formatos: PDF, DOCX, PNG"}
            </p>
            <button>Seleccionar Archivo</button>
          </div>

          <div className="progress-bar">
            <div style={{ width: `${progreso}%` }}>
              {progreso}%
            </div>
          </div>
        </div>

        {/* LISTA */}
        <div className="report-container">

          <div className="report-header">
            <span>REPORTE GENERADO</span>
            <button onClick={toggleSelectAll}>
              {todosSeleccionados ? "DESELECCIONAR" : "SELECCIONAR"}
            </button>
          </div>

          <div className="report-list">
            {reportes.map((rep) => (
              <div
                key={rep.id}
                className={`report-item ${
                  rep.seleccionado ? "selected" : ""
                }`}
                onClick={() => toggleSelect(rep.id)}
              >
                <span>{rep.seleccionado ? "🔹" : "📄"}</span>

                <div className="report-info">
                  <b>{rep.nombre}</b>
                  <small>
                    {rep.fecha} - {rep.hora} - {rep.dia}
                  </small>
                </div>

                <div
                  className="actions"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button>⬇️</button>
                  <button>🖨️</button>
                  <button onClick={() => eliminarReporte(rep.id)}>
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* COMENTARIO */}
        <input
          className="comentario"
          placeholder="Añadir comentarios..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />

      </div>
    </div>
  );
}