import React, { useState, useRef } from 'react';

export default function Inventario() {
  // Estado para alternar entre las sub-vistas internas de Inventario ('medicamentos' o 'insumos')
  const [subModulo, setSubModulo] = useState('medicamentos');

  // Estados para la carga del Ticket de Insumos (image_a20aee.png)
  const [progreso, setProgreso] = useState(78); // Inicializado en 78% como en tu captura
  const [estaCargando, setEstaCargando] = useState(false);
  const fileInputRef = useRef(null);

  // Estado simulado para la tabla de Insumos
  const [insumos, setInsumos] = useState([
    { id: 1, material: 'escoba', cantidadActual: 450, cantidadMinima: 200, estado: 'Bueno' }
  ]);

  // Estado simulado para la tabla de Medicamentos (image_a20b0f.png)
  const [medicamentos, setMedicamentos] = useState([
    { id: 1, nombre: 'Paracetamol', categoria: 'Analgesico', stockActual: 450, stockMinimo: 200, precio: '250.59', estado: 'Bueno' }
  ]);

  // Manejador para simular la subida del Ticket de Insumos
  const controlarSubidaTicket = (e) => {
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
        setEstaCargando(false);
        
        // Agregar insumo de prueba tras "analizar" el ticket
        const nuevoInsumo = {
          id: Date.now(),
          material: archivo.name.split('.')[0],
          cantidadActual: Math.floor(Math.random() * 500) + 10,
          cantidadMinima: 100,
          estado: 'Bueno'
        };
        setInsumos(prev => [nuevoInsumo, ...prev]);
        alert(`¡Ticket Procesado! Datos extraídos de de: ${archivo.name}`);
      }
    }, 100);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', width: '100%', boxSizing: 'border-box' }}>
      
      {/* ENCABEZADO E INTERRUPTOR INTUITIVO DE VISTAS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '32px', color: '#1A1CA6', fontWeight: 'bold', margin: 0 }}>Inventario</h1>
          <p style={{ color: '#4A5568', margin: '5px 0 0 0', fontSize: '14px', fontWeight: 'bold' }}>
            Historial de medicamentos y insumos
          </p>
        </div>
        
        {/* Selector de sub-módulo al estilo pestaña */}
        <div style={{ backgroundColor: '#E2E8F0', padding: '5px', borderRadius: '20px', display: 'flex', gap: '5px' }}>
          <button 
            onClick={() => setSubModulo('medicamentos')}
            style={{ padding: '8px 20px', borderRadius: '15px', border: 'none', fontWeight: 'bold', cursor: 'pointer', backgroundColor: subModulo === 'medicamentos' ? '#0080FF' : 'transparent', color: subModulo === 'medicamentos' ? '#FFF' : '#4A5568', transition: 'all 0.2s' }}
          >
            📦 Medicamentos
          </button>
          <button 
            onClick={() => setSubModulo('insumos')}
            style={{ padding: '8px 20px', borderRadius: '15px', border: 'none', fontWeight: 'bold', cursor: 'pointer', backgroundColor: subModulo === 'insumos' ? '#0080FF' : 'transparent', color: subModulo === 'insumos' ? '#FFF' : '#4A5568', transition: 'all 0.2s' }}
          >
            🧾 Ticket Insumos
          </button>
        </div>
      </div>

      {/* ================= SECCIÓN 1: MEDICAMENTOS (image_a20b0f.png) ================= */}
      {subModulo === 'medicamentos' && (
        <>
          {/* TARJETAS DE INDICADORES (KPIs) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', width: '100%' }}>
            
            {/* Total productos */}
            <div style={{ backgroundColor: '#FFFFFF', border: '2px solid #C4A484', borderRadius: '25px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '5px', position: 'relative' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#EADBC8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>📦</div>
              <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#1A202C', marginTop: '10px' }}>1,405</span>
              <span style={{ fontSize: '12px', color: '#718096', fontWeight: 'bold' }}>Total productos</span>
            </div>

            {/* Valor Total */}
            <div style={{ backgroundColor: '#FFFFFF', border: '2px solid #2ECC71', borderRadius: '25px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#E8F8F5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#2ECC71' }}>📈</div>
              <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#1A202C', marginTop: '10px' }}>45,000</span>
              <span style={{ fontSize: '12px', color: '#2ECC71', fontWeight: 'bold' }}>valor total</span>
            </div>

            {/* Stock Bajo */}
            <div style={{ backgroundColor: '#FFFFFF', border: '2px solid #F1C40F', borderRadius: '25px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#FEF9E7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color: '#F1C40F', fontWeight: 'bold' }}>!</div>
              <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#1A202C', marginTop: '10px' }}>3</span>
              <span style={{ fontSize: '12px', color: '#F1C40F', fontWeight: 'bold' }}>Stock Bajo</span>
            </div>

            {/* Stock Crítico */}
            <div style={{ backgroundColor: '#FFFFFF', border: '2px solid #E74C3C', borderRadius: '25px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#FDEDEC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#E74C3C' }}>⚠️</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginTop: '10px' }}>
                <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#1A202C' }}>2</span>
                <span style={{ fontSize: '12px', color: '#E74C3C', fontWeight: 'bold' }}>URGENTE</span>
              </div>
              <span style={{ fontSize: '12px', color: '#E74C3C', fontWeight: 'bold' }}>stock critico</span>
            </div>
          </div>

          {/* TABLA DE MEDICAMENTOS */}
          <div style={{ backgroundColor: '#0080FF', borderRadius: '25px', padding: '15px 0 0 0', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '2px solid #1A1CA6', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 25px 12px 25px' }}>
              <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '18px' }}>Medicamentos</span>
              <button style={{ backgroundColor: '#5DADE2', color: '#1A202C', border: 'none', borderRadius: '15px', padding: '6px 20px', fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                Filtro <span style={{ backgroundColor: '#0080FF', width: '12px', height: '12px', borderRadius: '50%', display: 'inline-block' }}></span>
              </button>
            </div>

            {/* Cuerpo de la tabla */}
            <div style={{ backgroundColor: '#FFFFFF', borderTop: '2px solid #1A1CA6', padding: '20px 25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              
              {/* Encabezados de Columna */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 1fr', padding: '0 15px', fontWeight: 'bold', color: '#2D3748', fontSize: '14px', backgroundColor: '#EBF5FB', borderRadius: '10px', height: '40px', alignItems: 'center', border: '1px solid #AEB6BF' }}>
                <div>Productos</div>
                <div>Categoria</div>
                <div>Stock actual</div>
                <div>Stock minimo</div>
                <div>precio</div>
                <div>Estado</div>
              </div>

              {/* Mapeo de Productos/Filas */}
              {medicamentos.map((med) => (
                <div key={med.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 1fr', padding: '15px', alignItems: 'center', border: '2px solid #4A5568', borderRadius: '15px', backgroundColor: '#F8FAFC', fontSize: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
                    <span style={{ fontSize: '20px' }}>📦</span> {med.nombre}
                  </div>
                  <div style={{ fontWeight: '500', color: '#4A5568' }}>{med.categoria}</div>
                  <div style={{ fontWeight: 'bold' }}>{med.stockActual}</div>
                  <div style={{ fontWeight: '500', color: '#718096' }}>{med.stockMinimo}</div>
                  <div style={{ fontWeight: 'bold', color: '#2C3E50' }}>{med.precio}</div>
                  <div style={{ fontWeight: 'bold', color: '#27AE60' }}>{med.estado}</div>
                </div>
              ))}

              {/* Botones Colapsables Inferiores */}
              <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ border: '2px solid #4A5568', borderRadius: '15px', padding: '15px 20px', fontWeight: 'bold', color: '#1A202C', backgroundColor: '#F8FAFC', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span>Producto mas gastado</span>
                  <span style={{ fontSize: '12px', color: '#718096' }}>Caducidades</span>
                </div>
                <div style={{ border: '2px solid #4A5568', borderRadius: '15px', padding: '15px 20px', fontWeight: 'bold', color: '#1A202C', backgroundColor: '#F8FAFC', cursor: 'pointer' }}>
                  Bajo producto
                </div>
              </div>

            </div>
          </div>
        </>
      )}

      {/* ================= SECCIÓN 2: TICKET INSUMOS (image_a20aee.png) ================= */}
      {subModulo === 'insumos' && (
        <>
          {/* CONTROL DE CARGA / DROPZONE */}
          <div style={{ backgroundColor: '#FFFFFF', border: '2px solid #1A1CA6', borderRadius: '30px', padding: '25px', display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', boxSizing: 'border-box' }}>
            <h3 style={{ textCenter: 'center', margin: '0 auto', fontSize: '18px', fontWeight: 'bold', color: '#2C3E50' }}>Ticket Insumos</h3>
            
            <input type="file" ref={fileInputRef} onChange={controlarSubidaTicket} style={{ display: 'none' }} accept=".pdf,.docx,.png,.xlsx,.jpg" />

            <div 
              onClick={() => !estaCargando && fileInputRef.current.click()}
              style={{ border: '3px dashed #0080FF', borderRadius: '20px', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', backgroundColor: '#F8FAFC', cursor: estaCargando ? 'not-allowed' : 'pointer', width: '100%', boxSizing: 'border-box' }}
            >
              <button style={{ position: 'absolute', top: '15px', left: '15px', backgroundColor: '#0080FF', color: 'white', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer' }}>📤</button>
              <button style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: '#0080FF', color: 'white', border: 'none', borderRadius: '10px', padding: '8px 20px', fontWeight: 'bold', cursor: 'pointer' }}>
                {estaCargando ? "Leyendo..." : "Seleccionar Archivo"}
              </button>
              
              <div style={{ fontSize: '50px', color: '#718096', marginTop: '10px' }}>📤</div>
              <p style={{ color: '#0052CC', fontSize: '13px', fontWeight: 'bold', marginTop: '10px' }}>
                Formatos: PDF , DOCX, PNG, ETC
              </p>
            </div>

            {/* BARRA DE PROGRESO */}
            <div style={{ width: '100%', backgroundColor: '#1A437E', borderRadius: '20px', height: '35px', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
              <div style={{ width: `${progreso}%`, backgroundColor: '#0080FF', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', transition: 'width 0.2s ease' }}>
                <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '16px' }}>{progreso}%</span>
              </div>
            </div>
          </div>

          {/* TABLA DE INSUMOS EXTRACTADOS */}
          <div style={{ backgroundColor: '#0080FF', borderRadius: '25px', padding: '15px 0 0 0', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '2px solid #1A1CA6', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ padding: '0 25px 12px 25px' }}>
              <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '18px' }}>Insumos</span>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderTop: '2px solid #1A1CA6', padding: '20px 25px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {/* Encabezados Insumos */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr 1fr', padding: '0 20px', fontWeight: 'bold', color: '#1A202C', fontSize: '14px', backgroundColor: '#AEB6BF', borderRadius: '12px', height: '40px', alignItems: 'center' }}>
                <div>material</div>
                <div>cantidad actual</div>
                <div>Cantidad Minima</div>
                <div>Estado</div>
              </div>

              {/* Fila Mapeada de Materiales */}
              {insumos.map((ins) => (
                <div key={ins.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr 1fr', padding: '15px 20px', alignItems: 'center', border: '2px solid #4A5568', borderRadius: '15px', backgroundColor: '#F8FAFC', fontSize: '14px' }}>
                  <div style={{ fontWeight: 'bold', color: '#1A202C' }}>{ins.material}</div>
                  <div style={{ fontWeight: '500' }}>{ins.cantidadActual}</div>
                  <div style={{ fontWeight: '500', color: '#718096' }}>{ins.cantidadMinima}</div>
                  <div style={{ fontWeight: 'bold', color: '#27AE60' }}>{ins.estado}</div>
                </div>
              ))}

              {/* Caja vacía simulada al final de tu diseño */}
              <div style={{ border: '2px solid #4A5568', borderRadius: '15px', height: '48px', backgroundColor: '#F8FAFC' }}></div>

            </div>
          </div>
        </>
      )}

    </div>
  );
}