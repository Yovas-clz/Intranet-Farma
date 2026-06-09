import React from "react";

export default function MedicamentosView() {
  const medicamentos = [
    {
      id: 1,
      nombre: "Paracetamol",
      categoria: "Analgésico",
      stockActual: 450,
      stockMinimo: 200,
      precio: "250.59",
      estado: "Bueno",
    },
  ];

  return (
    <div className="table-box">

      <div className="table-header">
        Medicamentos
      </div>

      <div className="table-body">

        {/* ENCABEZADO */}
        <div className="table-row table-head">
          <div>Producto</div>
          <div>Categoría</div>
          <div>Stock</div>
          <div>Mínimo</div>
          <div>Precio</div>
          <div>Estado</div>
        </div>

        {/* DATOS */}
        {medicamentos.map((med) => (
          <div key={med.id} className="table-row">
            <div>📦 {med.nombre}</div>
            <div>{med.categoria}</div>
            <div>{med.stockActual}</div>
            <div>{med.stockMinimo}</div>
            <div>{med.precio}</div>
            <div className="estado-ok">{med.estado}</div>
          </div>
        ))}

      </div>
    </div>
  );
}