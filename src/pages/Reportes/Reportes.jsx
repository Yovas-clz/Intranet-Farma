import React, { useState, useRef } from 'react';

// ================= COMPONENTE DE INVENTARIO =================
function VistaInventario() {
  const [subModulo, setSubModulo] = useState('medicamentos');
  const [progreso, setProgreso] = useState(78);
  const [estaCargando, setEstaCargando] = useState(false);
  const fileInputRef = useRef(null);

  const [insumos, setInsumos] = useState([
    { id: 1, material: 'Escoba', cantidadActual: 450, cantidadMinima: 200, estado: 'Bueno' }
  ]);

  const [medicamentos, setMedicamentos] = useState([
    { id: 1, nombre: 'Paracetamol', categoria: 'Analgésico', stockActual: 450, stockMinimo: 200, precio: '250.59', estado: 'Bueno' }
  ]);

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
        const nuevoInsumo = {
          id: Date.now(),
          material: archivo.name.split('.')[0],
          cantidadActual: Math.floor(Math.random() * 500) + 10,
          cantidadMinima: 100,
          estado: 'Bueno'
        };
        setInsumos(prev => [nuevoInsumo, ...prev]);
        alert(`¡Ticket Procesado! Datos extraídos de: ${archivo.name}`);
      }
    }, 100);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', width: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '32px', color: '#1A1CA6', fontWeight: 'bold', margin: 0 }}>Inventario</h1>
          <p style={{ color: '#4A5568', margin: '5px 0 0 0', fontSize: '14px', fontWeight: 'bold' }}>Historial de medicamentos e insumos</p>
        </div>
        <div style={{ backgroundColor: '#E2E8F0', padding: '5px', borderRadius: '20px', display: 'flex', gap: '5px' }}>
          <button onClick={() => setSubModulo('medicamentos')} style={{ padding: '8px 20px', borderRadius: '15px', border: 'none', fontWeight: 'bold', cursor: 'pointer', backgroundColor: subModulo === 'medicamentos' ? '#0080FF' : 'transparent', color: subModulo === 'medicamentos' ? '#FFF' : '#4A5568' }}>📦 Medicamentos</button>
          <button onClick={() => setSubModulo('insumos')} style={{ padding: '8px 20px', borderRadius: '15px', border: 'none', fontWeight: 'bold', cursor: 'pointer', backgroundColor: subModulo === 'insumos' ? '#0080FF' : 'transparent', color: subModulo === 'insumos' ? '#FFF' : '#4A5568' }}>🧾 Ticket Insumos</button>
        </div>
      </div>

      {subModulo === 'medicamentos' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', width: '100%' }}>
            <div style={{ backgroundColor: '#FFFFFF', border: '2px solid #C4A484', borderRadius: '25px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#EADBC8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>📦</div>
              <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#1A202C', marginTop: '10px' }}>1,405</span>
              <span style={{ fontSize: '12px', color: '#718096', fontWeight: 'bold' }}>Total productos</span>
            </div>
            <div style={{ backgroundColor: '#FFFFFF', border: '2px solid #2ECC71', borderRadius: '25px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#E8F8F5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#2ECC71' }}>📈</div>
              <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#1A202C', marginTop: '10px' }}>45,000</span>
              <span style={{ fontSize: '12px', color: '#2ECC71', fontWeight: 'bold' }}>Valor total</span>
            </div>
            <div style={{ backgroundColor: '#FFFFFF', border: '2px solid #F1C40F', borderRadius: '25px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#FEF9E7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color: '#F1C40F', fontWeight: 'bold' }}>!</div>
              <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#1A202C', marginTop: '10px' }}>3</span>
              <span style={{ fontSize: '12px', color: '#F1C40F', fontWeight: 'bold' }}>Stock Bajo</span>
            </div>
            <div style={{ backgroundColor: '#FFFFFF', border: '2px solid #E74C3C', borderRadius: '25px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#FDEDEC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#E74C3C' }}>⚠️</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginTop: '10px' }}>
                <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#1A202C' }}>2</span>
                <span style={{ fontSize: '12px', color: '#E74C3C', fontWeight: 'bold' }}>URGENTE</span>
              </div>
              <span style={{ fontSize: '12px', color: '#E74C3C', fontWeight: 'bold' }}>Stock crítico</span>
            </div>
          </div>

          <div style={{ backgroundColor: '#0080FF', borderRadius: '25px', padding: '15px 0 0 0', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '2px solid #1A1CA6', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 25px 12px 25px' }}>
              <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '18px' }}>Medicamentos</span>
              <button style={{ backgroundColor: '#5DADE2', color: '#1A202C', border: 'none', borderRadius: '15px', padding: '6px 20px', fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>Filtro</button>
            </div>
            <div style={{ backgroundColor: '#FFFFFF', borderTop: '2px solid #1A1CA6', padding: '20px 25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 1fr', padding: '0 15px', fontWeight: 'bold', color: '#2D3748', fontSize: '14px', backgroundColor: '#EBF5FB', borderRadius: '10px', height: '40px', alignItems: 'center', border: '1px solid #AEB6BF' }}>
                <div>Productos</div><div>Categoría</div><div>Stock actual</div><div>Stock mínimo</div><div>Precio</div><div>Estado</div>
              </div>
              {medicamentos.map((med) => (
                <div key={med.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 1fr', padding: '15px', alignItems: 'center', border: '2px solid #4A5568', borderRadius: '15px', backgroundColor: '#F8FAFC' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>📦 {med.nombre}</div>
                  <div>{med.categoria}</div><div>{med.stockActual}</div><div>{med.stockMinimo}</div><div>{med.precio}</div><div style={{ color: '#27AE60', fontWeight: 'bold' }}>{med.estado}</div>
                </div>
              ))}
              <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ border: '2px solid #4A5568', borderRadius: '15px', padding: '15px 20px', fontWeight: 'bold', backgroundColor: '#F8FAFC' }}>
                  <div>Producto más gastado</div><div style={{ fontSize: '12px', color: '#718096' }}>Caducidades</div>
                </div>
                <div style={{ border: '2px solid #4A5568', borderRadius: '15px', padding: '15px 20px', fontWeight: 'bold', backgroundColor: '#F8FAFC' }}>Bajo producto</div>
              </div>
            </div>
          </div>
        </>
      )}

      {subModulo === 'insumos' && (
        <>
          <div style={{ backgroundColor: '#FFFFFF', border: '2px solid #1A1CA6', borderRadius: '30px', padding: '25px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ margin: '0 auto', fontSize: '18px', fontWeight: 'bold' }}>Ticket Insumos</h3>
            <input type="file" ref={fileInputRef} onChange={controlarSubidaTicket} style={{ display: 'none' }} />
            <div onClick={() => !estaCargando && fileInputRef.current.click()} style={{ border: '3px dashed #0080FF', borderRadius: '20px', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', cursor: 'pointer', gap: '15px' }}>
              <div style={{ fontSize: '50px', color: '#0080FF' }}>📤</div>
              <p style={{ color: '#0052CC', fontSize: '14px', fontWeight: 'bold', margin: 0 }}>Formatos: PDF, DOCX, PNG, ETC</p>
            </div>
            <div style={{ width: '100%', backgroundColor: '#1A437E', borderRadius: '20px', height: '35px', overflow: 'hidden' }}>
              <div style={{ width: `${progreso}%`, backgroundColor: '#0080FF', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: 'bold' }}>{progreso}%</div>
            </div>
          </div>

          <div style={{ backgroundColor: '#0080FF', borderRadius: '25px', padding: '15px 0 0 0', overflow: 'hidden', border: '2px solid #1A1CA6' }}>
            <div style={{ padding: '0 25px 12px 25px' }}><span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '18px' }}>Insumos</span></div>
            <div style={{ backgroundColor: '#FFFFFF', borderTop: '2px solid #1A1CA6', padding: '20px 25px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr 1fr', padding: '0 20px', fontWeight: 'bold', backgroundColor: '#AEB6BF', borderRadius: '12px', height: '40px', alignItems: 'center' }}>
                <div>Material</div><div>Cantidad actual</div><div>Cantidad Mínima</div><div>Estado</div>
              </div>
              {insumos.map((ins) => (
                <div key={ins.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr 1fr', padding: '15px 20px', border: '2px solid #4A5568', borderRadius: '15px', backgroundColor: '#F8FAFC' }}>
                  <div style={{ fontWeight: 'bold' }}>{ins.material}</div><div>{ins.cantidadActual}</div><div>{ins.cantidadMinima}</div><div style={{ color: '#27AE60', fontWeight: 'bold' }}>{ins.estado}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ================= COMPONENTE GENERAL DE REPORTES =================
export default function Reportes() {
  const [seccionActual, setSeccionActual] = useState('reportes'); 

  const [progreso, setProgreso] = useState(0); 
  const [estaCargando, setEstaCargando] = useState(false);
  const fileInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  const [notificaciones, setNotificaciones] = useState(3);
  const [fotoPerfil, setFotoPerfil] = useState("https://via.placeholder.com/32");

  const [reportes, setReportes] = useState([
    { id: 1, nombre: "Reporte Ventas 1xxxxxx0  2026.pdf", fecha: "2026-03-15", hora: "14:30", dia: "Viernes", seleccionado: false },
    { id: 2, nombre: "Reporte Ventas 1xxxxxx0  2026.pdf", fecha: "2026-03-15", hora: "14:30", dia: "Viernes", seleccionado: false },
    { id: 3, nombre: "Reporte Ventas 1xxxxxx0  2026.pdf", fecha: "2026-03-15", hora: "14:30", dia: "Viernes", seleccionado: false },
    { id: 4, nombre: "Reporte Ventas 1xxxxxx0  2026.pdf", fecha: "2026-03-15", hora: "14:30", dia: "Viernes", seleccionado: false },
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
        const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const nuevoReporte = {
          id: Date.now(),
          nombre: archivo.name,
          fecha: ahora.toISOString().split('T')[0],
          hora: ahora.toTimeString().split(' ')[0].substring(0, 5),
          dia: diasSemana[ahora.getDay()],
          seleccionado: false
        };
        setReportes(prev => [nuevoReporte, ...prev]);
        setEstaCargando(false);
        alert(`¡Éxito! Datos extraídos correctamente de: ${archivo.name}`);
      }
    }, 150);
  };

  const cambiarFotoPerfil = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const urlImagen = URL.createObjectURL(archivo);
      setFotoPerfil(urlImagen);
    }
  };

  const conmutarSeleccionarTodo = () => {
    const nuevoEstado = !todosSeleccionados;
    setTodosSeleccionados(nuevoEstado);
    setReportes(prev => prev.map(rep => ({ ...rep, seleccionado: nuevoEstado })));
  };

  const conmutarSeleccionIndividual = (id) => {
    setReportes(prev => prev.map(rep => rep.id === id ? { ...rep, seleccionado: !rep.seleccionado } : rep));
  };

  const descargarReporte = (nombre) => {
    alert(`Iniciando la descarga del archivo: ${nombre}`);
  };

  const imprimirReporte = (nombre) => {
    alert(`Enviando a la cola de impresión local: ${nombre}`);
  };

  const eliminarReporte = (id, nombre) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar permanentemente: ${nombre}?`)) {
      setReportes(prev => prev.filter(rep => rep.id !== id));
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#D6E6F2', fontFamily: 'Arial, sans-serif' }}>
      
      {/* MENÚ LATERAL */}
      <div style={{ width: '240px', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px 0', borderRight: '1px solid #E2E8F0', position: 'sticky', top: 0, height: '100vh', boxSizing: 'border-box' }}>
        <div>
          <div style={{ textAlign: 'center', padding: '20px 0', marginBottom: '20px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '24px', color: '#0052CC', fontStyle: 'italic' }}>100% FARMA</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ padding: '12px 25px', display: 'flex', alignItems: 'center', gap: '12px', color: '#4A5568', fontSize: '14px', cursor: 'pointer' }}><span>🎛️</span> Dashboard</li>
            
            {/* Botón Reportes */}
            <li 
              onClick={() => setSeccionActual('reportes')}
              style={{ padding: '12px 25px', display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: seccionActual === 'reportes' ? '#D6E6F2' : 'transparent', color: seccionActual === 'reportes' ? '#0052CC' : '#4A5568', borderRadius: '0 20px 20px 0', fontSize: '14px', fontWeight: seccionActual === 'reportes' ? 'bold' : 'normal', marginRight: '15px', cursor: 'pointer' }}
            >
              <span>📄</span> Reportes
            </li>
            
            {/* Botón Inventario */}
            <li 
              onClick={() => setSeccionActual('inventario')}
              style={{ padding: '12px 25px', display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: seccionActual === 'inventario' ? '#D6E6F2' : 'transparent', color: seccionActual === 'inventario' ? '#0052CC' : '#4A5568', borderRadius: '0 20px 20px 0', fontSize: '14px', fontWeight: seccionActual === 'inventario' ? 'bold' : 'normal', marginRight: '15px', cursor: 'pointer' }}
            >
              <span>🛒</span> Inventario
            </li>
          </ul>
        </div>
        <div style={{ padding: '12px 25px', display: 'flex', alignItems: 'center', gap: '12px', color: '#4A5568', fontSize: '14px', borderTop: '1px solid #EDF2F7', cursor: 'pointer' }}>
          <span>🚪</span> Cerrar sesión
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div style={{ flex: 1, padding: '20px 40px', display: 'flex', flexDirection: 'column', gap: '20px', boxSizing: 'border-box', minWidth: 0 }}>
        
        {/* BARRA SUPERIOR */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', padding: '10px 25px', borderRadius: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '4px', height: '24px', backgroundColor: '#000000', borderRadius: '2px' }}></div>
            <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#1A202C', textTransform: 'capitalize' }}>{seccionActual}</span>
          </div>
          <div>
            <input type="text" placeholder="🔍 Buscar aquí...." style={{ padding: '8px 20px 8px 40px', borderRadius: '20px', border: 'none', backgroundColor: '#E2E8F0', width: '280px', fontSize: '14px', outline: 'none' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setNotificaciones(0)}>
              <span style={{ fontSize: '22px' }}>🔔</span>
              {notificaciones > 0 && <span style={{ position: 'absolute', top: '-5px', right: '-5px', backgroundColor: '#FF4D4F', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '10px', fontWeight: 'bold' }}>{notificaciones}</span>}
            </div>
            <input type="file" ref={avatarInputRef} accept="image/*" style={{ display: 'none' }} onChange={cambiarFotoPerfil} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => avatarInputRef.current.click()}>
              <div style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#0052CC', overflow: 'hidden', border: '2px solid #0052CC' }}>
                <img src={fotoPerfil} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 'bold', fontSize: '13px', color: '#1A202C' }}>Zuheidi M ⚙️</span>
                <span style={{ fontSize: '11px', color: '#718096' }}>Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENIDO DINÁMICO RESTRINGIDO */}
        {seccionActual === 'reportes' ? (
          <>
            <div>
              <h1 style={{ fontSize: '32px', color: '#1A1CA6', fontWeight: 'bold', margin: 0 }}>Gestión de Reportes</h1>
            </div>
            
            {/* CAJA DRAG & DROP INTEGRADA Y PERFECTAMENTE ALINEADA */}
            <div style={{ backgroundColor: '#FFFFFF', border: '2px solid #1A1CA6', borderRadius: '30px', padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <input type="file" ref={fileInputRef} onChange={controlarSubidaArchivo} style={{ display: 'none' }} accept=".pdf,.docx,.png,.xlsx,.jpg" />
              
              <div 
                onClick={() => !estaCargando && fileInputRef.current.click()} 
                style={{ border: '3px dashed #0080FF', borderRadius: '20px', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', cursor: estaCargando ? 'not-allowed' : 'pointer', gap: '15px' }}
              >
                <div style={{ fontSize: '60px', color: '#0080FF', lineHeight: 1 }}>📤</div>
                
                <p style={{ color: '#0052CC', fontSize: '15px', fontWeight: 'bold', margin: 0, textAlign: 'center' }}>
                  {estaCargando ? "Procesando metadatos y OCR..." : "Formatos: PDF, DOCX, PNG, ETC"}
                </p>

                <button style={{ backgroundColor: '#0080FF', color: 'white', border: 'none', borderRadius: '25px', padding: '10px 25px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 6px rgba(0, 128, 255, 0.2)' }}>
                  <span>📤</span> {estaCargando ? "Extrayendo..." : "Seleccionar Archivo"}
                </button>
              </div>

              {/* BARRA DE PROGRESO */}
              <div style={{ width: '80%', margin: '0 auto', backgroundColor: '#1A437E', borderRadius: '20px', height: '35px', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
                <div style={{ width: `${progreso}%`, backgroundColor: '#0080FF', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', transition: 'width 0.1s ease' }}>
                  <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '16px' }}>{progreso}%</span>
                </div>
              </div>
            </div>

            {/* TABLA DE REPORTE GENERADO */}
            <div style={{ backgroundColor: '#0080FF', borderRadius: '25px', padding: '15px 0 0 0', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '12px', border: '2px solid #1A1CA6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 25px 5px 25px' }}>
                <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '14px' }}>REPORTE GENERADO</span>
                <button onClick={conmutarSeleccionarTodo} style={{ backgroundColor: todosSeleccionados ? '#BEE3F8' : '#90CDF4', color: '#1A202C', border: 'none', borderRadius: '15px', padding: '6px 15px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                  {todosSeleccionados ? "☑️ DESELECCIONAR" : "☑️ SELECCIONAR"}
                </button>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', borderTop: '2px solid #1A1CA6', padding: '20px 15px', display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '320px', overflowY: 'auto' }}>
                {reportes.map((reporte) => (
                  <div key={reporte.id} onClick={() => conmutarSeleccionIndividual(reporte.id)} style={{ display: 'flex', alignItems: 'center', border: '2px solid #4A5568', borderRadius: '15px', padding: '10px 20px', backgroundColor: reporte.seleccionado ? '#EBF8FF' : '#F7FAFC', cursor: 'pointer' }}>
                    <span style={{ fontSize: '30px', marginRight: '15px' }}>{reporte.seleccionado ? "🔹" : "📄"}</span>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{reporte.nombre}</span>
                      <div style={{ display: 'flex', gap: '15px', fontSize: '11px', color: '#718096', fontWeight: 'bold' }}>
                        <span>📅 {reporte.fecha}</span><span>🕒 {reporte.hora}</span><span>🏢 {reporte.dia}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }} onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => descargarReporte(reporte.nombre)} style={{ border: 'none', borderRadius: '50%', width: '35px', height: '35px', backgroundColor: '#90CDF4', cursor: 'pointer' }}>⬇️</button>
                      <button onClick={() => imprimirReporte(reporte.nombre)} style={{ border: 'none', borderRadius: '50%', width: '35px', height: '35px', backgroundColor: '#90CDF4', cursor: 'pointer' }}>🖨️</button>
                      <button onClick={() => eliminarReporte(reporte.id, reporte.nombre)} style={{ border: 'none', borderRadius: '50%', width: '35px', height: '35px', backgroundColor: '#FEB2B2', cursor: 'pointer' }}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* COMENTARIOS */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <input type="text" placeholder="Añadir comentarios..." value={comentario} onChange={(e) => setComentario(e.target.value)} style={{ width: '60%', padding: '12px 25px', borderRadius: '25px', border: '2px solid #0080FF', outline: 'none', textAlign: 'center' }} />
            </div>
          </>
        ) : (
          <VistaInventario />
        )}

      </div>
    </div>
  );
}