import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Inventario() {
  const navigate = useNavigate();
  
  // Estado para alternar entre sub-módulos de Inventario (Medicamentos / Ticket Insumos)
  const [subModulo, setSubModulo] = useState('medicamentos');
  
  // Estados para simular la subida del ticket de insumos
  const [progreso, setProgreso] = useState(78);
  const [estaCargando, setEstaCargando] = useState(false);
  const fileInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  // Estados del encabezado general
  const [notificaciones, setNotificaciones] = useState(3);
  const [fotoPerfil, setFotoPerfil] = useState("https://via.placeholder.com/32");

  // Datos simulados de las tablas (idénticos a tus capturas)
  const [insumos, setInsumos] = useState([
    { id: 1, material: 'escoba', cantidadActual: 450, cantidadMinima: 200, estado: 'Bueno' }
  ]);

  const [medicamentos, setMedicamentos] = useState([
    { id: 1, nombre: 'Paracetamol', categoria: 'Analgesico', stockActual: 450, stockMinimo: 200, precio: '250.59', estado: 'Bueno' }
  ]);

  // Manejo de la subida simulada del Ticket de Insumos
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
          material: archivo.name.split('.')[0].toLowerCase(),
          cantidadActual: Math.floor(Math.random() * 500) + 10,
          cantidadMinima: 200,
          estado: 'Bueno'
        };
        setInsumos(prev => [nuevoInsumo, ...prev]);
        alert(`¡Ticket Procesado! Datos añadidos de de: ${archivo.name}`);
      }
    }, 100);
  };

  const cambiarFotoPerfil = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const urlImagen = URL.createObjectURL(archivo);
      setFotoPerfil(urlImagen);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#D6E6F2', fontFamily: 'sans-serif' }}>
      
      {/* ==========================================
          SIDEBAR FIJO AL BORDE DE LA PANTALLA (image_24119b.png)
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
            
            {/* Inventario - ACTIVO */}
            <button style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '100%', padding: '14px 35px', border: 'none', background: '#D6E6F2', color: '#0052CC', fontWeight: 'bold', fontSize: '16px', borderRadius: '0 20px 20px 0', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontSize: '18px' }}>🛒</span> Inventario
            </button>

            {/* Estadísticas - Pendiente para tu compañero */}
            <button onClick={() => alert('Módulo de Estadísticas pendiente de conexión')} style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '100%', padding: '14px 35px', border: 'none', background: 'transparent', color: '#4A5568', fontSize: '16px', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontSize: '18px' }}>📈</span> Estadísticas
            </button>

            {/* Encuestas - Pendiente para tu compañero */}
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
        
        {/* ENCABEZADO / NAVBAR (image_2414a4.png) */}
        <div style={{ backgroundColor: '#FFFFFF', height: '56px', borderRadius: '28px', padding: '0 25px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', boxSizing: 'border-box', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginRight: '40px' }}>
              <span style={{ borderLeft: '3px solid black', height: '20px', display: 'inline-block' }}></span>
              <span style={{ fontWeight: 'bold', fontSize: '17px', color: '#1A202C' }}>Inventario</span>
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

        {/* TITULO DE LA SECCIÓN Y BOTONES CONMUTADORES SUBMODULO */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
          <div>
            <h1 style={{ fontSize: '28px', color: '#1A1CA6', fontWeight: 'bold', margin: 0, fontFamily: 'sans-serif' }}>Inventario</h1>
            <p style={{ color: '#718096', margin: '4px 0 0 0', fontSize: '13px', fontWeight: 'bold' }}>Historial de medicamentos e insumos</p>
          </div>
          {/* Suiche de pestañas superiores */}
          <div style={{ backgroundColor: '#E2E8F0', padding: '5px', borderRadius: '20px', display: 'flex', gap: '5px' }}>
            <button 
              onClick={() => setSubModulo('medicamentos')} 
              style={{ padding: '8px 20px', borderRadius: '15px', border: 'none', fontWeight: 'bold', cursor: 'pointer', backgroundColor: subModulo === 'medicamentos' ? '#0080FF' : 'transparent', color: subModulo === 'medicamentos' ? '#FFF' : '#4A5568', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              📦 Medicamentos
            </button>
            <button 
              onClick={() => setSubModulo('insumos')} 
              style={{ padding: '8px 20px', borderRadius: '15px', border: 'none', fontWeight: 'bold', cursor: 'pointer', backgroundColor: subModulo === 'insumos' ? '#0080FF' : 'transparent', color: subModulo === 'insumos' ? '#FFF' : '#4A5568', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              📜 Ticket Insumos
            </button>
          </div>
        </div>

        {/* ========================================================
            VISTA 1: MEDICAMENTOS (image_241466.png)
            ======================================================== */}
        {subModulo === 'medicamentos' && (
          <>
            {/* Fila de Tarjetas Informativas */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', width: '100%' }}>
              {/* Tarjeta 1 */}
              <div style={{ backgroundColor: '#FFFFFF', border: '2px solid #C4A484', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#EADBC8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>📦</div>
                <span style={{ fontSize: '26px', fontWeight: 'bold', color: '#1A202C', marginTop: '8px' }}>1,405</span>
                <span style={{ fontSize: '11px', color: '#718096', fontWeight: 'bold' }}>Total productos</span>
              </div>
              {/* Tarjeta 2 */}
              <div style={{ backgroundColor: '#FFFFFF', border: '2px solid #2ECC71', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#E8F8F5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>📈</div>
                <span style={{ fontSize: '26px', fontWeight: 'bold', color: '#1A202C', marginTop: '8px' }}>45,000</span>
                <span style={{ fontSize: '11px', color: '#2ECC71', fontWeight: 'bold' }}>valor total</span>
              </div>
              {/* Tarjeta 3 */}
              <div style={{ backgroundColor: '#FFFFFF', border: '2px solid #F1C40F', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#FEF9E7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: '#F1C40F', fontWeight: 'bold' }}>!</div>
                <span style={{ fontSize: '26px', fontWeight: 'bold', color: '#1A202C', marginTop: '8px' }}>3</span>
                <span style={{ fontSize: '11px', color: '#F1C40F', fontWeight: 'bold' }}>Stock Bajo</span>
              </div>
              {/* Tarjeta 4 */}
              <div style={{ backgroundColor: '#FFFFFF', border: '2px solid #E74C3C', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#FDEDEC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: '#E74C3C' }}>⚠️</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginTop: '8px' }}>
                  <span style={{ fontSize: '26px', fontWeight: 'bold', color: '#1A202C' }}>2</span>
                  <span style={{ fontSize: '11px', color: '#E74C3C', fontWeight: 'bold' }}>URGENTE</span>
                </div>
                <span style={{ fontSize: '11px', color: '#E74C3C', fontWeight: 'bold' }}>stock critico</span>
              </div>
            </div>

            {/* Contenedor Azul de la Tabla */}
            <div style={{ backgroundColor: '#0080FF', borderRadius: '20px', padding: '12px 0 0 0', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '2px solid #1A1CA6', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 25px 12px 25px' }}>
                <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '18px' }}>Medicamentos</span>
                <button style={{ backgroundColor: '#5DADE2', color: '#1A202C', border: 'none', borderRadius: '15px', padding: '6px 20px', fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>Filtro 🔵</button>
              </div>
              
              {/* Cuerpo blanco interno de la tabla */}
              <div style={{ backgroundColor: '#FFFFFF', borderTop: '2px solid #1A1CA6', padding: '20px 15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {/* Encabezado columnas */}
                <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 2fr 1.5fr 1.5fr 1.5fr 1.5fr', padding: '0 15px', fontWeight: 'bold', color: '#2D3748', fontSize: '14px', backgroundColor: '#EBF5FB', borderRadius: '10px', height: '40px', alignItems: 'center', border: '1px solid #AEB6BF' }}>
                  <div>Productos</div><div>Categoria</div><div>Stock actual</div><div>Stock minimo</div><div>precio</div><div>Estado</div>
                </div>
                {/* Registro original mapeado */}
                {medicamentos.map((med) => (
                  <div key={med.id} style={{ display: 'grid', gridTemplateColumns: '2.5fr 2fr 1.5fr 1.5fr 1.5fr 1.5fr', padding: '14px 15px', alignItems: 'center', border: '2px solid #1A1CA6', borderRadius: '15px', backgroundColor: '#FFFFFF', fontSize: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>📦 {med.nombre}</div>
                    <div style={{ color: '#4A5568' }}>{med.categoria}</div>
                    <div style={{ fontWeight: 'bold' }}>{med.stockActual}</div>
                    <div style={{ color: '#A0AEC0' }}>{med.stockMinimo}</div>
                    <div style={{ fontWeight: 'bold' }}>{med.precio}</div>
                    <div style={{ color: '#2ECC71', fontWeight: 'bold' }}>{med.estado}</div>
                  </div>
                ))}
                
                {/* Campos vacíos inferiores de diseño */}
                <div style={{ border: '2px solid #1A1CA6', borderRadius: '15px', padding: '16px 20px', backgroundColor: '#FFFFFF' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#1A202C' }}>Producto mas gastado</div>
                  <div style={{ fontSize: '12px', color: '#718096', fontWeight: 'bold', marginTop: '2px' }}>Caducidades</div>
                </div>
                <div style={{ border: '2px solid #1A1CA6', borderRadius: '15px', padding: '20px', backgroundColor: '#FFFFFF', fontWeight: 'bold', fontSize: '15px', color: '#1A202C' }}>
                  Bajo producto
                </div>
              </div>
            </div>
          </>
        )}

        {/* ========================================================
            VISTA 2: TICKET INSUMOS (image_2414db.png)
            ======================================================== */}
        {subModulo === 'insumos' && (
          <>
            {/* Panel de carga superior externo */}
            <div style={{ backgroundColor: '#FFFFFF', border: '2px solid #1A1CA6', borderRadius: '25px', padding: '25px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ margin: '0 auto', fontSize: '18px', fontWeight: 'bold', color: '#1A202C' }}>Ticket Insumos</h3>
              <input type="file" ref={fileInputRef} onChange={controlarSubidaTicket} style={{ display: 'none' }} />
              
              <div 
                onClick={() => !estaCargando && fileInputRef.current.click()} 
                style={{ border: '2.5px dashed #0080FF', borderRadius: '20px', padding: '40px 20px', display: 'flex', position: 'relative', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', cursor: 'pointer' }}
              >
                <div style={{ position: 'absolute', left: '20px', top: '20px', backgroundColor: '#0080FF', padding: '6px', borderRadius: '8px', color: '#FFF' }}>📥</div>
                <button style={{ position: 'absolute', right: '20px', top: '20px', backgroundColor: '#0080FF', color: 'white', border: 'none', borderRadius: '10px', padding: '10px 22px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>
                  Seleccionar Archivo
                </button>
                <div style={{ fontSize: '45px', marginTop: '15px' }}>📤</div>
                <p style={{ color: '#0052CC', fontSize: '13px', fontWeight: 'bold', margin: '10px 0 0 0' }}>Formatos: PDF , DOCX, PNG, ETC</p>
              </div>

              {/* Barra de progreso de subida */}
              <div style={{ width: '100%', backgroundColor: '#1A437E', borderRadius: '20px', height: '34px', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
                <div style={{ width: `${progreso}%`, backgroundColor: '#0080FF', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'width 0.2s ease' }}>
                  <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '14px' }}>{progreso}%</span>
                </div>
              </div>
            </div>

            {/* Contenedor de la Tabla Insumos */}
            <div style={{ backgroundColor: '#0080FF', borderRadius: '20px', padding: '12px 0 0 0', overflow: 'hidden', border: '2px solid #1A1CA6' }}>
              <div style={{ padding: '0 25px 12px 25px' }}><span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '18px' }}>Insumos</span></div>
              
              <div style={{ backgroundColor: '#FFFFFF', borderTop: '2px solid #1A1CA6', padding: '20px 15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {/* Columnas */}
                <div style={{ display: 'grid', gridTemplateColumns: '3fr 2.5fr 2.5fr 2fr', padding: '0 20px', fontWeight: 'bold', backgroundColor: '#AEB6BF', borderRadius: '10px', height: '40px', alignItems: 'center', fontSize: '14px', color: '#1A202C' }}>
                  <div>material</div><div>cantidad actual</div><div>Cantidad Minima</div><div>Estado</div>
                </div>
                {/* Mapeo del registro */}
                {insumos.map((ins) => (
                  <div key={ins.id} style={{ display: 'grid', gridTemplateColumns: '3fr 2.5fr 2.5fr 2fr', padding: '14px 20px', border: '2px solid #1A1CA6', borderRadius: '15px', backgroundColor: '#FFFFFF', fontSize: '14px', alignItems: 'center' }}>
                    <div style={{ fontWeight: 'bold', color: '#1A202C' }}>{ins.material}</div>
                    <div style={{ fontWeight: 'bold' }}>{ins.cantidadActual}</div>
                    <div style={{ color: '#A0AEC0' }}>{ins.cantidadMinima}</div>
                    <div style={{ color: '#2ECC71', fontWeight: 'bold' }}>{ins.estado}</div>
                  </div>
                ))}
                {/* Línea vacía decorativa inferior */}
                <div style={{ border: '2px solid #1A1CA6', borderRadius: '15px', height: '48px', backgroundColor: '#FFFFFF' }}></div>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}