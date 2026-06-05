import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sucursales() {
  const navigate = useNavigate();

  // Datos de las 16 sucursales para renderizar en el scroll
  const [listaSucursales] = useState(
    Array.from({ length: 16 }, (_, i) => ({
      id: i + 1,
      nombre: `sucursales`,
      direccion: i === 0 ? "**********" : `Av. Juárez No. ${200 + i * 4}, San Mateo Atenco, EdoMex`,
      telefono: i === 0 ? "755-584-549" : `755-584-549${i % 10}`,
      gerente: i === 0 ? "" : `Ing. Encargado ${String.fromCharCode(65 + (i % 6))}`,
      infoAdicional: i > 0 ? "informacion de la sucursal" : "",
      colorCabecera: i % 3 === 0 ? '#EF4444' : i % 3 === 1 ? '#10B981' : '#0080FF'
    }))
  );

  return (
    <div className="d-flex" style={{ width: '100vw', height: '100vh', backgroundColor: '#D6E6F2', fontFamily: 'sans-serif', overflow: 'hidden' }}>
      
      {/* ==========================================
          SIDEBAR (Menú Lateral con todos los módulos)
          ========================================== */}
      <div style={{ 
        width: '260px', 
        backgroundColor: '#FFFFFF', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', // <-- ¡CORREGIDO CON C MAYÚSCULA PARA FIJAR ABAJO!
        borderRight: '1px solid #E2E8F0', 
        boxSizing: 'border-box', 
        flexShrink: 0,
        height: '100vh',
        paddingBottom: '20px'
      }}>
        <div>
          {/* Logo corporativo */}
          <div style={{ padding: '40px 25px 30px 35px', display: 'flex', alignItems: 'center' }}>
            <span style={{ borderLeft: '3px solid #0052CC', paddingLeft: '8px', fontSize: '28px', fontStyle: 'italic', fontWeight: 'bold', color: '#0052CC', letterSpacing: '0.5px' }}>
              100% FARMA
            </span>
          </div>

          {/* Lista completa de módulos */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '5px', paddingRight: '12px' }}>
            <button onClick={() => navigate('/Dashboard')} style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '100%', padding: '14px 35px', border: 'none', background: 'transparent', color: '#4A5568', fontSize: '16px', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontSize: '18px' }}>⁝⁝</span> Dashboard
            </button>
            
            <button onClick={() => navigate('/Reportes')} style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '100%', padding: '14px 35px', border: 'none', background: 'transparent', color: '#4A5568', fontSize: '16px', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontSize: '18px' }}>📄</span> Reportes
            </button>
            
            <button onClick={() => navigate('/Inventario')} style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '100%', padding: '14px 35px', border: 'none', background: 'transparent', color: '#4A5568', fontSize: '16px', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontSize: '18px' }}>🛒</span> Inventario
            </button>

            {/* Módulo de Estadísticas */}
            <button onClick={() => alert('Módulo de Estadísticas pendiente de conexión')} style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '100%', padding: '14px 35px', border: 'none', background: 'transparent', color: '#4A5568', fontSize: '16px', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontSize: '18px' }}>📈</span> Estadísticas
            </button>

            {/* Módulo de Encuestas */}
            <button onClick={() => alert('Módulo de Encuestas pendiente de conexión')} style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '100%', padding: '14px 35px', border: 'none', background: 'transparent', color: '#4A5568', fontSize: '16px', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontSize: '18px' }}>📊</span> Encuestas
            </button>

            {/* Pestaña Activa: Sucursales (Fondo azul redondeado) */}
            <button style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '100%', padding: '14px 35px', border: 'none', background: '#D6E6F2', color: '#0052CC', fontWeight: 'bold', fontSize: '16px', borderRadius: '0 20px 20px 0', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontSize: '18px' }}>🏠</span> Sucursales
            </button>

            {/* Módulo de Evidencias - ENLAZADO */}
            <button onClick={() => navigate('/Evidencias')} style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '100%', padding: '14px 35px', border: 'none', background: 'transparent', color: '#4A5568', fontSize: '16px', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontSize: '18px' }}>📑</span> Evidencias
            </button>
          </nav>
        </div>

        {/* Botón Cerrar sesión - FIJO ABAJO IMPECABLE */}
        <div style={{ padding: '20px 35px', borderTop: '1px solid #F1F5F9' }}>
          <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'none', border: 'none', color: '#4A5568', fontSize: '16px', cursor: 'pointer' }}>
            <span style={{ fontSize: '18px' }}>🚪</span> Cerrar sesión
          </button>
        </div>
      </div>

      {/* ==========================================
          CONTENEDOR PRINCIPAL DERECHO (NAVBAR + TABLAS)
          ========================================== */}
      <div className="flex-grow-1" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '20px 30px', boxSizing: 'border-box' }}>
        
        {/* NAVBAR FLOTANTE */}
        <div style={{ backgroundColor: '#FFFFFF', height: '56px', borderRadius: '28px', padding: '0 25px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: '25px', boxSizing: 'border-box', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginRight: '60px' }}>
              <span style={{ borderLeft: '3px solid black', height: '22px', display: 'inline-block' }}></span>
              <span style={{ fontWeight: 'bold', color: '#000000', fontSize: '17px' }}>Sucursales</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 1, paddingRight: '100px' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input 
                  type="text" 
                  placeholder="Buscar aquí...." 
                  style={{ padding: '8px 20px 8px 42px', borderRadius: '20px', border: 'none', width: '380px', backgroundColor: '#E2E8F0', outline: 'none', fontSize: '14px', color: '#4A5568' }}
                />
                <span style={{ position: 'absolute', left: '16px', color: '#718096', fontSize: '15px', display: 'flex', alignItems: 'center' }}>🔍</span>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
            <div style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '20px' }}>🔔</span>
              <span style={{ position: 'absolute', top: '-5px', right: '-4px', backgroundColor: '#FF3B30', color: 'white', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#0052CC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '13px' }}>ZM</div>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
                <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#000000', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Zuheidi M <span style={{ fontSize: '11px', color: '#718096' }}>⚙️</span>
                </span>
                <span style={{ color: '#718096', fontSize: '11px' }}>Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            ÁREA DE CONTENIDO CON SCROLL
            ========================================== */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px', overflow: 'hidden' }}>
          <h2 style={{ color: '#1A1C4B', margin: '0 0 5px 0', fontSize: '26px', fontWeight: 'bold', paddingLeft: '5px', flexShrink: 0 }}>
            Gestión de Sucursales
          </h2>
          
          <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {listaSucursales.map((suc) => (
              <div 
                key={suc.id} 
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  borderRadius: '18px', 
                  overflow: 'hidden', 
                  border: '1.5px solid #D6A3FB', 
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                  width: '100%',
                  boxSizing: 'border-box',
                  flexShrink: 0, 
                  height: '140px' 
                }}
              >
                <div style={{ backgroundColor: suc.colorCabecera, padding: '8px 20px', display: 'flex', alignItems: 'center', gap: '12px', height: '40px', boxSizing: 'border-box' }}>
                  <span style={{ fontSize: '16px', color: '#FFF', display: 'flex', alignItems: 'center' }}>➔</span>
                  <h3 style={{ margin: 0, color: '#FFFFFF', fontSize: '18px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
                    {suc.nombre}
                  </h3>
                </div>

                <div style={{ padding: '15px 25px', display: 'flex', alignItems: 'center', gap: '25px', height: '100px', boxSizing: 'border-box' }}>
                  <div style={{ fontSize: '45px', color: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '50px' }}>
                    🏪
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '14px', color: '#111111' }}>
                    <div><strong>Dirección:</strong> {suc.direccion}</div>
                    <div><strong>Teléfono:</strong> {suc.telefono}</div>
                    <div>
                      <strong>Gerente/Encargado:</strong>{' '}
                      {suc.id === 1 ? 'Por asignar' : <span style={{ color: '#4A5568' }}>{suc.gerente}</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}