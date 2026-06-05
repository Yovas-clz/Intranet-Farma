import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Evidencias() {
  const navigate = useNavigate();
  const [seccionActual, setSeccionActual] = useState('evidencias');

  // Estados para la carga del archivo/ticket
  const [progreso, setProgreso] = useState(0);
  const [estaCargando, setEstaCargando] = useState(false);
  const fileInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  // Estados generales del encabezado
  const [notificaciones, setNotificaciones] = useState(3);
  const [fotoPerfil, setFotoPerfil] = useState("https://via.placeholder.com/32");

  // Listado de evidencias simulando la extracción de datos por OCR/Metadatos
  const [evidencias, setEvidencias] = useState([
    { id: 1, nombre: "Evidencia_Ticket_001_2026.pdf", fecha: "2026-04-10", hora: "11:20", tipo: "Ticket Insumos", seleccionado: false },
    { id: 2, nombre: "Evidencia_Ticket_002_2026.png", fecha: "2026-04-12", hora: "16:45", tipo: "Ticket Medicamentos", seleccionado: false },
    { id: 3, nombre: "Evidencia_Ticket_003_2026.pdf", fecha: "2026-04-15", hora: "09:15", tipo: "Ticket Insumos", seleccionado: false },
  ]);

  const [comentario, setComentario] = useState("");
  const [todasSeleccionadas, setTodasSeleccionadas] = useState(false);

  // Simulación de la extracción automática de datos del ticket al subirlo
  const controlarSubidaEvidencia = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;
    
    setEstaCargando(true);
    setProgreso(0);
    let porcentaje = 0;
    
    const intervalo = setInterval(() => {
      porcentaje += 10;
      setProgreso(porcentaje);
      
      if (porcentaje >= 100) {
        clearInterval(intervalo);
        const ahora = new Date();
        
        // Creamos el nuevo registro simulando los datos extraídos del ticket de referencia
        const nuevaEvidencia = {
          id: Date.now(),
          nombre: archivo.name,
          fecha: ahora.toISOString().split('T')[0],
          hora: ahora.toTimeString().split(' ')[0].substring(0, 5),
          tipo: archivo.name.toLowerCase().includes('insumo') ? "Ticket Insumos" : "Ticket General",
          seleccionado: false
        };
        
        setEvidencias(prev => [nuevaEvidencia, ...prev]);
        setEstaCargando(false);
        alert(`¡Extracción Exitosa! Se procesaron los datos del ticket: ${archivo.name}`);
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
    const nuevoEstado = !todasSeleccionadas;
    setTodasSeleccionadas(nuevoEstado);
    setEvidencias(prev => prev.map(ev => ({ ...ev, seleccionado: nuevoEstado })));
  };

  const conmutarSeleccionIndividual = (id) => {
    setEvidencias(prev => prev.map(ev => ev.id === id ? { ...ev, seleccionado: !ev.seleccionado } : ev));
  };

  const descargarEvidencia = (nombre) => {
    alert(`Descargando archivo extraído: ${nombre}`);
  };

  const imprimirEvidencia = (nombre) => {
    alert(`Enviando a impresión: ${nombre}`);
  };

  const eliminarEvidencia = (id, nombre) => {
    if (window.confirm(`¿Remover de la lista el archivo: ${nombre}?`)) {
      setEvidencias(prev => prev.filter(ev => ev.id !== id));
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#D6E6F2', fontFamily: 'sans-serif' }}>
      
      {/* ==========================================
          SIDEBAR FIJO AL BORDE DE LA PANTALLA
          ========================================== */}
      <div style={{ 
        width: '260px', 
        backgroundColor: '#FFFFFF', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        padding: '20px 0', 
        borderRight: '1px solid #E2E8F0', 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        bottom: 0, 
        height: '100vh', 
        boxSizing: 'border-box', 
        flexShrink: 0,
        zIndex: 100
      }}>
        <div>
          <div style={{ padding: '20px 25px 20px 35px', display: 'flex', alignItems: 'center' }}>
            <span style={{ borderLeft: '3px solid #0052CC', paddingLeft: '8px', fontSize: '28px', fontStyle: 'italic', fontWeight: 'bold', color: '#0052CC', letterSpacing: '0.5px' }}>
              100% FARMA
            </span>
          </div>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '5px', paddingRight: '12px' }}>
            {/* Dashboard */}
            <button onClick={() => navigate('/Dashboard')} style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '100%', padding: '14px 35px', border: 'none', background: 'transparent', color: '#4A5568', fontSize: '16px', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontSize: '18px' }}>⁝⁝</span> Dashboard
            </button>
            
            {/* Reportes */}
            <button onClick={() => navigate('/Reportes')} style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '100%', padding: '14px 35px', border: 'none', background: 'transparent', color: '#4A5568', fontSize: '16px', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontSize: '18px' }}>📄</span> Reportes
            </button>
            
            {/* Inventario */}
            <button onClick={() => navigate('/Inventario')} style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '100%', padding: '14px 35px', border: 'none', background: 'transparent', color: '#4A5568', fontSize: '16px', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontSize: '18px' }}>🛒</span> Inventario
            </button>

            {/* Módulos en reserva para tu compañero */}
            <button onClick={() => alert('Módulo de Estadísticas pendiente de conexión')} style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '100%', padding: '14px 35px', border: 'none', background: 'transparent', color: '#4A5568', fontSize: '16px', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontSize: '18px' }}>📈</span> Estadísticas
            </button>

            <button onClick={() => alert('Módulo de Encuestas pendiente de conexión')} style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '100%', padding: '14px 35px', border: 'none', background: 'transparent', color: '#4A5568', fontSize: '16px', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontSize: '18px' }}>📊</span> Encuestas
            </button>

            {/* Sucursales */}
            <button onClick={() => navigate('/Sucursales')} style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '100%', padding: '14px 35px', border: 'none', background: 'transparent', color: '#4A5568', fontSize: '16px', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontSize: '18px' }}>🏠</span> Sucursales
            </button>

            {/* Evidencias - ACTIVO */}
            <button style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '100%', padding: '14px 35px', border: 'none', background: '#D6E6F2', color: '#0052CC', fontWeight: 'bold', fontSize: '16px', borderRadius: '0 20px 20px 0', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontSize: '18px' }}>📑</span> Evidencias
            </button>
          </nav>
        </div>
        
        <div style={{ padding: '20px 35px', borderTop: '1px solid #F1F5F9' }}>
          <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'none', border: 'none', color: '#4A5568', fontSize: '16px', cursor: 'pointer' }}>
            <span style={{ fontSize: '18px' }}>🚪</span> Cerrar sesión
          </button>
        </div>
      </div>

      {/* ==========================================
          CONTENEDOR PRINCIPAL DERECHO (CON MARGEN DE COMPENSACIÓN)
          ========================================== */}
      <div style={{ 
        flex: 1, 
        marginLeft: '260px', 
        padding: '20px 30px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '20px', 
        boxSizing: 'border-box', 
        minHeight: '100vh'
      }}>
        
        {/* NAVBAR SUPERIOR */}
        <div style={{ backgroundColor: '#FFFFFF', height: '56px', borderRadius: '28px', padding: '0 25px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', boxSizing: 'border-box', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginRight: '40px' }}>
              <span style={{ borderLeft: '3px solid black', height: '20px', display: 'inline-block' }}></span>
              <span style={{ fontWeight: 'bold', fontSize: '17px', color: '#1A202C' }}>Evidencias</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 1, paddingRight: '60px' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input type="text" placeholder="Buscar evidencia...." style={{ padding: '8px 20px 8px 42px', borderRadius: '20px', border: 'none', backgroundColor: '#E2E8F0', width: '340px', fontSize: '14px', outline: 'none', color: '#4A5568' }} />
                <span style={{ position: 'absolute', left: '16px', color: '#718096', fontSize: '15px', display: 'flex', alignItems: 'center' }}>🔍</span>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
            <div style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => setNotificaciones(0)}>
              <span style={{ fontSize: '20px' }}>🔔</span>
              {notificaciones > 0 && <span style={{ position: 'absolute', top: '-5px', right: '-4px', backgroundColor: '#FF3B30', color: 'white', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{notificaciones}</span>}
            </div>
            <input type="file" ref={avatarInputRef} accept="image/*" style={{ display: 'none' }} onChange={cambiarFotoPerfil} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => avatarInputRef.current.click()}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#0052CC', overflow: 'hidden' }}>
                <img src={fotoPerfil} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
                <span style={{ fontWeight: 'bold', fontSize: '13px', color: '#1A202C' }}>Zuheidi M ⚙️</span>
                <span style={{ fontSize: '11px', color: '#718096' }}>Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* TITULO DE LA SECCIÓN */}
        <div>
          <h1 style={{ fontSize: '26px', color: '#1A1CA6', fontWeight: 'bold', margin: 0 }}>Gestión de Evidencias</h1>
        </div>
        
        {/* PANEL DE CONTROL: CARGA DE TICKETS */}
        <div style={{ backgroundColor: '#FFFFFF', border: '2px solid #1A1CA6', borderRadius: '25px', padding: '25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="file" ref={fileInputRef} onChange={controlarSubidaEvidencia} style={{ display: 'none' }} accept=".pdf,.docx,.png,.xlsx,.jpg" />
          
          <div 
            onClick={() => !estaCargando && fileInputRef.current.click()} 
            style={{ border: '2.5px dashed #0080FF', borderRadius: '15px', padding: '30px 15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', cursor: estaCargando ? 'not-allowed' : 'pointer', gap: '10px' }}
          >
            <div style={{ fontSize: '45px', color: '#0080FF', lineHeight: 1 }}>📤</div>
            <p style={{ color: '#0052CC', fontSize: '14px', fontWeight: 'bold', margin: 0, textAlign: 'center' }}>
              {estaCargando ? "Extrayendo metadatos y OCR del Ticket..." : "Subir Ticket de Referencia (PDF, PNG, JPG)"}
            </p>
            <button style={{ backgroundColor: '#0080FF', color: 'white', border: 'none', borderRadius: '20px', padding: '8px 20px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', boxShadow: '0 3px 5px rgba(0, 128, 255, 0.15)' }}>
              Seleccionar Ticket
            </button>
          </div>

          {/* Barra de Progreso de Extracción */}
          <div style={{ width: '80%', margin: '0 auto', backgroundColor: '#1A437E', borderRadius: '15px', height: '30px', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: `${progreso}%`, backgroundColor: '#0080FF', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '15px', transition: 'width 0.1s ease' }}>
              <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '14px' }}>{progreso}%</span>
            </div>
          </div>
        </div>

        {/* TABLA CONTENEDORA CON SCROLL VERTICAL */}
        <div style={{ backgroundColor: '#0080FF', borderRadius: '20px', padding: '12px 0 0 0', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '10px', border: '2px solid #1A1CA6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px 5px 20px' }}>
            <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '14px' }}>DATOS EXTRAÍDOS DEL TICKET</span>
            <button onClick={conmutarSeleccionarTodo} style={{ backgroundColor: todasSeleccionadas ? '#BEE3F8' : '#90CDF4', color: '#1A202C', border: 'none', borderRadius: '12px', padding: '5px 12px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
              {todasSeleccionadas ? "☑️ DESELECCIONAR" : "☑️ SELECCIONAR TODO"}
            </button>
          </div>

          {/* Contenedor de la lista con Scroll (maxHeight y overflowY) */}
          <div style={{ 
            backgroundColor: '#FFFFFF', 
            borderTop: '2px solid #1A1CA6', 
            padding: '15px 10px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '10px', 
            maxHeight: '280px', 
            overflowY: 'auto' 
          }}>
            {evidencias.map((ev) => (
              <div key={ev.id} onClick={() => conmutarSeleccionIndividual(ev.id)} style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #4A5568', borderRadius: '12px', padding: '8px 15px', backgroundColor: ev.seleccionado ? '#EBF8FF' : '#F7FAFC', cursor: 'pointer' }}>
                <span style={{ fontSize: '24px', marginRight: '12px' }}>{ev.seleccionado ? "🔹" : "📄"}</span>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '13px', color: '#1A202C' }}>{ev.nombre}</span>
                  <div style={{ display: 'flex', gap: '15px', fontSize: '11px', color: '#718096', fontWeight: 'bold' }}>
                    <span>📅 Fecha: {ev.fecha}</span>
                    <span>🕒 Hora: {ev.hora}</span>
                    <span>🏷️ Tipo: {ev.tipo}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }} onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => descargarEvidencia(ev.nombre)} style={{ border: 'none', borderRadius: '50%', width: '30px', height: '30px', backgroundColor: '#90CDF4', cursor: 'pointer', fontSize: '12px' }}>⬇️</button>
                  <button onClick={() => imprimirEvidencia(ev.nombre)} style={{ border: 'none', borderRadius: '50%', width: '30px', height: '30px', backgroundColor: '#90CDF4', cursor: 'pointer', fontSize: '12px' }}>🖨️</button>
                  <button onClick={() => eliminarEvidencia(ev.id, ev.nombre)} style={{ border: 'none', borderRadius: '50%', width: '30px', height: '30px', backgroundColor: '#FEB2B2', cursor: 'pointer', fontSize: '12px' }}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NOTAS ADICIONALES */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
          <input type="text" placeholder="Añadir observaciones sobre las evidencias..." value={comentario} onChange={(e) => setComentario(e.target.value)} style={{ width: '60%', padding: '10px 20px', borderRadius: '20px', border: '2px solid #0080FF', outline: 'none', textAlign: 'center', fontSize: '14px' }} />
        </div>

      </div>
    </div>
  );
}