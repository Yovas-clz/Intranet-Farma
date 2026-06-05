import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Reportes() {
  const navigate = useNavigate();
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
  const [surveyResponses, setSurveyResponses] = useState([]);

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

  const handleSurveySubmit = (value) => {
    setSurveyResponses(prev => [...prev, value]);
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
            
            {/* Pestaña: Reportes (Activo) */}
            <button onClick={() => setSeccionActual('reportes')} style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '100%', padding: '14px 35px', border: 'none', background: seccionActual === 'reportes' ? '#D6E6F2' : 'transparent', color: seccionActual === 'reportes' ? '#0052CC' : '#4A5568', fontWeight: seccionActual === 'reportes' ? 'bold' : 'normal', fontSize: '16px', borderRadius: '0 20px 20px 0', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontSize: '18px' }}>📄</span> Reportes
            </button>
            
            {/* Pestaña: Inventario (Ya conectado) */}
            <button onClick={() => navigate('/Inventario')} style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '100%', padding: '14px 35px', border: 'none', background: 'transparent', color: '#4A5568', fontSize: '16px', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontSize: '18px' }}>🛒</span> Inventario
            </button>

            {/* Módulos Adicionales Reservados para tu compañero */}
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

            {/* Evidencias */}
            <button onClick={() => navigate('/Evidencias')} style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '100%', padding: '14px 35px', border: 'none', background: 'transparent', color: '#4A5568', fontSize: '16px', cursor: 'pointer', textAlign: 'left' }}>
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
          CONTENEDOR PRINCIPAL DE REPORTE (CON MARGEN)
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
              <span style={{ fontWeight: 'bold', fontSize: '17px', color: '#1A202C' }}>Reportes</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 1, paddingRight: '60px' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input type="text" placeholder="Buscar aquí...." style={{ padding: '8px 20px 8px 42px', borderRadius: '20px', border: 'none', backgroundColor: '#E2E8F0', width: '340px', fontSize: '14px', outline: 'none', color: '#4A5568' }} />
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

        {/* CONTENIDO INTERNO DE REPORTES */}
        <div>
          <h1 style={{ fontSize: '26px', color: '#1A1CA6', fontWeight: 'bold', margin: 0 }}>Gestión de Reportes</h1>
        </div>
        
        <div style={{ backgroundColor: '#FFFFFF', border: '2px solid #1A1CA6', borderRadius: '25px', padding: '25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="file" ref={fileInputRef} onChange={controlarSubidaArchivo} style={{ display: 'none' }} accept=".pdf,.docx,.png,.xlsx,.jpg" />
          
          <div 
            onClick={() => !estaCargando && fileInputRef.current.click()} 
            style={{ border: '2.5px dashed #0080FF', borderRadius: '15px', padding: '30px 15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', cursor: estaCargando ? 'not-allowed' : 'pointer', gap: '10px' }}
          >
            <div style={{ fontSize: '45px', color: '#0080FF', lineHeight: 1 }}>📤</div>
            <p style={{ color: '#0052CC', fontSize: '14px', fontWeight: 'bold', margin: 0, textAlign: 'center' }}>
              {estaCargando ? "Procesando metadatos y OCR..." : "Formatos: PDF, DOCX, PNG, ETC"}
            </p>
            <button style={{ backgroundColor: '#0080FF', color: 'white', border: 'none', borderRadius: '20px', padding: '8px 20px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', boxShadow: '0 3px 5px rgba(0, 128, 255, 0.15)' }}>
              Seleccionar Archivo
            </button>
          </div>

          <div style={{ width: '80%', margin: '0 auto', backgroundColor: '#1A437E', borderRadius: '15px', height: '30px', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: `${progreso}%`, backgroundColor: '#0080FF', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '15px', transition: 'width 0.1s ease' }}>
              <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '14px' }}>{progreso}%</span>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#0080FF', borderRadius: '20px', padding: '12px 0 0 0', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '10px', border: '2px solid #1A1CA6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px 5px 20px' }}>
            <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '14px' }}>REPORTE GENERADO</span>
            <button onClick={conmutarSeleccionarTodo} style={{ backgroundColor: todosSeleccionados ? '#BEE3F8' : '#90CDF4', color: '#1A202C', border: 'none', borderRadius: '12px', padding: '5px 12px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
              {todosSeleccionados ? "☑️ DESELECCIONAR" : "☑️ SELECCIONAR"}
            </button>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', borderTop: '2px solid #1A1CA6', padding: '15px 10px', display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '280px', overflowY: 'auto' }}>
            {reportes.map((reporte) => (
              <div key={reporte.id} onClick={() => conmutarSeleccionIndividual(reporte.id)} style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #4A5568', borderRadius: '12px', padding: '8px 15px', backgroundColor: reporte.seleccionado ? '#EBF8FF' : '#F7FAFC', cursor: 'pointer' }}>
                <span style={{ fontSize: '24px', marginRight: '12px' }}>{reporte.seleccionado ? "🔹" : "📄"}</span>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '13px' }}>{reporte.nombre}</span>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: '#718096', fontWeight: 'bold' }}>
                    <span>📅 {reporte.fecha}</span><span>🕒 {reporte.hora}</span><span>🏢 {reporte.dia}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }} onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => descargarReporte(reporte.nombre)} style={{ border: 'none', borderRadius: '50%', width: '30px', height: '30px', backgroundColor: '#90CDF4', cursor: 'pointer', fontSize: '12px' }}>⬇️</button>
                  <button onClick={() => imprimirReporte(reporte.nombre)} style={{ border: 'none', borderRadius: '50%', width: '30px', height: '30px', backgroundColor: '#90CDF4', cursor: 'pointer', fontSize: '12px' }}>🖨️</button>
                  <button onClick={() => eliminarReporte(reporte.id, reporte.nombre)} style={{ border: 'none', borderRadius: '50%', width: '30px', height: '30px', backgroundColor: '#FEB2B2', cursor: 'pointer', fontSize: '12px' }}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
          <input type="text" placeholder="Añadir comentarios..." value={comentario} onChange={(e) => setComentario(e.target.value)} style={{ width: '60%', padding: '10px 20px', borderRadius: '20px', border: '2px solid #0080FF', outline: 'none', textAlign: 'center', fontSize: '14px' }} />
        </div>

      </div>
    </div>
  );
}