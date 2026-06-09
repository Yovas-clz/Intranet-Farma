import React, { useState, useRef } from "react";

export default function InsumosView() {
  const [progreso, setProgreso] = useState(0);
  const [cargando, setCargando] = useState(false);
  const fileRef = useRef();

  const [insumos, setInsumos] = useState([
    {
      id: 1,
      material: "Escoba",
      cantidadActual: 450,
      cantidadMinima: 200,
      estado: "Bueno",
    },
  ]);

  const subirArchivo = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCargando(true);
    setProgreso(0);

    let porcentaje = 0;

    const intervalo = setInterval(() => {
      porcentaje += 5;
      setProgreso(porcentaje);

      if (porcentaje >= 100) {
        clearInterval(intervalo);
        setCargando(false);

        const nuevo = {
          id: Date.now(),
          material: file.name,
          cantidadActual: Math.floor(Math.random() * 500),
          cantidadMinima: 200,
          estado: "Bueno",
        };

        setInsumos((prev) => [nuevo, ...prev]);
      }
    }, 100);
  };

  return (
    <>
      {/* UPLOAD */}
      <div className="upload-box">
        <input
          type="file"
          ref={fileRef}
          onChange={subirArchivo}
          hidden
        />

        <div
          className="drop-zone"
          onClick={() => !cargando && fileRef.current.click()}
        >
          <span className="icon">📤</span>
          <p>{cargando ? "Subiendo..." : "Selecciona archivo"}</p>
          <button>Subir</button>
        </div>

        <div className="progress-bar">
          <div style={{ width: `${progreso}%` }}>
            {progreso}%
          </div>
        </div>
      </div>

      {/* TABLA */}
      <div className="table-box">

        <div className="table-header">
          Insumos
        </div>

        <div className="table-body">

          <div className="table-row table-head">
            <div>Material</div>
            <div>Actual</div>
            <div>Mínimo</div>
            <div>Estado</div>
          </div>

          {insumos.map((i) => (
            <div key={i.id} className="table-row">
              <div>{i.material}</div>
              <div>{i.cantidadActual}</div>
              <div>{i.cantidadMinima}</div>
              <div className="estado-ok">{i.estado}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}