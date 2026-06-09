import React, { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

import MedicamentosView from "../../components/inventario/MedicamentosView";
import InsumosView from "../../components/inventario/InsumosView";

import "../../styles/inventario.css";

export default function Inventario() {
  const [subModulo, setSubModulo] = useState("medicamentos");

  return (
    <div className="main-container">

      <Sidebar active="inventario" />

      <div className="content">
        <Navbar title="Inventario" />

        {/* HEADER */}
        <div className="header-inventario">

          <div>
            <h1 className="inventario-title">Inventario</h1>
            <p className="inventario-subtitle">
              Historial de medicamentos e insumos
            </p>
          </div>

          {/* SWITCH */}
          <div className="switch-container">

            <button
              className={`switch-btn ${subModulo === "medicamentos" ? "active" : ""}`}
              onClick={() => setSubModulo("medicamentos")}
            >
              📦 Medicamentos
            </button>

            <button
              className={`switch-btn ${subModulo === "insumos" ? "active" : ""}`}
              onClick={() => setSubModulo("insumos")}
            >
              📜 Insumos
            </button>

          </div>
        </div>

        {/* CONTENIDO */}
        <div className="inventario-container">
          {subModulo === "medicamentos" && <MedicamentosView />}
          {subModulo === "insumos" && <InsumosView />}
        </div>

      </div>
    </div>
  );
}